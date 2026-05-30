import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class NetworkTopologySection extends StatefulWidget {
  const NetworkTopologySection({super.key});

  @override
  State<NetworkTopologySection> createState() => _NetworkTopologySectionState();
}

class _NetworkTopologySectionState extends State<NetworkTopologySection> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  final List<_TopoNode> _nodes = [
    _TopoNode(id: 'c1', label: 'Client 01', icon: Icons.computer, x: 0.1, y: 0.25, type: _NodeType.client),
    _TopoNode(id: 'c2', label: 'Client 02', icon: Icons.smartphone, x: 0.1, y: 0.75, type: _NodeType.client),
    _TopoNode(id: 'sw1', label: 'Access Switch', icon: Icons.hub, x: 0.3, y: 0.5, type: _NodeType.network),
    _TopoNode(id: 'r1', label: 'Core Router', icon: Icons.router, x: 0.5, y: 0.5, type: _NodeType.network),
    _TopoNode(id: 'fw', label: 'Firewall', icon: Icons.security, x: 0.65, y: 0.5, type: _NodeType.security),
    _TopoNode(id: 'sw2', label: 'Data Center Switch', icon: Icons.hub, x: 0.8, y: 0.5, type: _NodeType.network),
    _TopoNode(id: 's1', label: 'Web Server', icon: Icons.dns, x: 0.95, y: 0.25, type: _NodeType.server),
    _TopoNode(id: 's2', label: 'DB Server', icon: Icons.dataset, x: 0.95, y: 0.75, type: _NodeType.server),
  ];

  final List<_TopoConnection> _connections = [
    _TopoConnection(from: 'c1', to: 'sw1'),
    _TopoConnection(from: 'c2', to: 'sw1'),
    _TopoConnection(from: 'sw1', to: 'r1'),
    _TopoConnection(from: 'r1', to: 'fw'),
    _TopoConnection(from: 'fw', to: 'sw2'),
    _TopoConnection(from: 'sw2', to: 's1'),
    _TopoConnection(from: 'sw2', to: 's2'),
    
    // Return paths for bidirectional feel
    _TopoConnection(from: 's1', to: 'sw2', isReturn: true),
    _TopoConnection(from: 's2', to: 'sw2', isReturn: true),
    _TopoConnection(from: 'sw2', to: 'fw', isReturn: true),
    _TopoConnection(from: 'fw', to: 'r1', isReturn: true),
    _TopoConnection(from: 'r1', to: 'sw1', isReturn: true),
    _TopoConnection(from: 'sw1', to: 'c1', isReturn: true),
    _TopoConnection(from: 'sw1', to: 'c2', isReturn: true),
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 4),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.settings_ethernet, color: AppTheme.secondary, size: 32),
              const SizedBox(width: 16),
              Text(
                'NETWORK OPERATIONS CENTER',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
              ).animate().fade().slideX(),
            ],
          ),
          const SizedBox(height: 32),
          GlassPanel(
            padding: 24.0,
            child: SizedBox(
              height: 450,
              width: double.infinity,
              child: LayoutBuilder(
                builder: (context, constraints) {
                  return Stack(
                    children: [
                      // Draw Lines and Animated Packets
                      AnimatedBuilder(
                        animation: _controller,
                        builder: (context, child) {
                          return CustomPaint(
                            size: Size(constraints.maxWidth, constraints.maxHeight),
                            painter: _TopologyPainter(
                              nodes: _nodes,
                              connections: _connections,
                              animationValue: _controller.value,
                            ),
                          );
                        },
                      ),
                      // Draw Nodes
                      ..._nodes.map((node) {
                        return Positioned(
                          left: constraints.maxWidth * node.x - 30, // 30 is half of node width
                          top: constraints.maxHeight * node.y - 30,
                          child: _TopologyNodeWidget(node: node),
                        );
                      }).toList(),
                    ],
                  );
                },
              ),
            ),
          ).animate().fade(duration: 1.seconds).scale(begin: const Offset(0.95, 0.95)),
        ],
      ),
    );
  }
}

enum _NodeType { client, network, security, server }

class _TopologyNodeWidget extends StatefulWidget {
  final _TopoNode node;
  const _TopologyNodeWidget({required this.node});

  @override
  State<_TopologyNodeWidget> createState() => _TopologyNodeWidgetState();
}

class _TopologyNodeWidgetState extends State<_TopologyNodeWidget> {
  bool _isHovered = false;

  Color _getColor() {
    switch (widget.node.type) {
      case _NodeType.client:
        return Colors.blueAccent;
      case _NodeType.network:
        return AppTheme.secondary;
      case _NodeType.security:
        return Colors.redAccent;
      case _NodeType.server:
        return AppTheme.accent;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _getColor();

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: Tooltip(
        message: 'Status: Online\nType: ${widget.node.type.name.toUpperCase()}',
        textStyle: const TextStyle(color: Colors.white, fontSize: 12),
        decoration: BoxDecoration(
          color: AppTheme.background.withValues(alpha: 0.9),
          border: Border.all(color: color),
          borderRadius: BorderRadius.circular(8),
        ),
        child: AnimatedScale(
          scale: _isHovered ? 1.3 : 1.0,
          duration: const Duration(milliseconds: 200),
          child: Container(
            width: 60,
            height: 60,
            decoration: BoxDecoration(
              color: AppTheme.primary.withValues(alpha: 0.1),
              shape: BoxShape.circle,
              border: Border.all(
                color: _isHovered ? color : color.withValues(alpha: 0.5),
                width: _isHovered ? 2 : 1,
              ),
              boxShadow: _isHovered
                  ? [BoxShadow(color: color.withValues(alpha: 0.5), blurRadius: 15)]
                  : [],
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  widget.node.icon,
                  color: _isHovered ? Colors.white : color,
                  size: 24,
                ),
                const SizedBox(height: 2),
                Text(
                  widget.node.label,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 7, color: Colors.white70),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _TopologyPainter extends CustomPainter {
  final List<_TopoNode> nodes;
  final List<_TopoConnection> connections;
  final double animationValue;

  _TopologyPainter({
    required this.nodes,
    required this.connections,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final linePaint = Paint()
      ..color = AppTheme.primary.withValues(alpha: 0.3)
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke;

    for (var conn in connections) {
      final fromNode = nodes.firstWhere((n) => n.id == conn.from);
      final toNode = nodes.firstWhere((n) => n.id == conn.to);

      final p1 = Offset(size.width * fromNode.x, size.height * fromNode.y);
      final p2 = Offset(size.width * toNode.x, size.height * toNode.y);

      // Only draw the physical line once (skip return connections for the line itself)
      if (!conn.isReturn) {
        canvas.drawLine(p1, p2, linePaint);
      }

      // Draw animated packets
      final packetPaint = Paint()
        ..color = conn.isReturn ? AppTheme.accent : AppTheme.secondary
        ..style = PaintingStyle.fill
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 2);

      // We can have multiple packets per line by using modulo
      for (int i = 0; i < 2; i++) {
        // Offset the return packets so they don't overlap exactly
        double offset = conn.isReturn ? 0.25 : 0.0;
        double t = (animationValue + (i * 0.5) + offset) % 1.0;
        
        final packetX = p1.dx + (p2.dx - p1.dx) * t;
        final packetY = p1.dy + (p2.dy - p1.dy) * t;
        
        canvas.drawCircle(Offset(packetX, packetY), 3, packetPaint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant _TopologyPainter oldDelegate) => true;
}

class _TopoNode {
  final String id;
  final String label;
  final IconData icon;
  final double x;
  final double y;
  final _NodeType type;

  _TopoNode({
    required this.id,
    required this.label,
    required this.icon,
    required this.x,
    required this.y,
    required this.type,
  });
}

class _TopoConnection {
  final String from;
  final String to;
  final bool isReturn;

  _TopoConnection({required this.from, required this.to, this.isReturn = false});
}
