import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class AwsArchitectureSection extends StatefulWidget {
  const AwsArchitectureSection({super.key});

  @override
  State<AwsArchitectureSection> createState() => _AwsArchitectureSectionState();
}

class _AwsArchitectureSectionState extends State<AwsArchitectureSection> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  final List<_ArchNode> _nodes = [
    _ArchNode(id: 'user', label: 'End User', icon: Icons.person_outline, x: 0.1, y: 0.5, info: 'Client request from browser or mobile app.'),
    _ArchNode(id: 'r53', label: 'Route 53', icon: Icons.router_outlined, x: 0.25, y: 0.5, info: 'DNS routing & latency-based traffic management.'),
    _ArchNode(id: 'cf', label: 'CloudFront', icon: Icons.cloud_circle_outlined, x: 0.4, y: 0.2, info: 'Global CDN caching static assets for fast delivery.'),
    _ArchNode(id: 's3', label: 'S3 Bucket', icon: Icons.storage_outlined, x: 0.6, y: 0.2, info: 'Highly durable object storage for assets.'),
    _ArchNode(id: 'alb', label: 'Load Balancer', icon: Icons.schema_outlined, x: 0.4, y: 0.8, info: 'Distributes incoming traffic across EC2 instances.'),
    _ArchNode(id: 'ec2_1', label: 'EC2 Instance A', icon: Icons.memory_outlined, x: 0.6, y: 0.65, info: 'Compute node running the application logic.'),
    _ArchNode(id: 'ec2_2', label: 'EC2 Instance B', icon: Icons.memory_outlined, x: 0.6, y: 0.95, info: 'Redundant compute node for high availability.'),
    _ArchNode(id: 'rds', label: 'Amazon RDS', icon: Icons.dataset_outlined, x: 0.8, y: 0.8, info: 'Managed relational database (Multi-AZ).'),
  ];

  final List<_ArchConnection> _connections = [
    _ArchConnection(from: 'user', to: 'r53'),
    _ArchConnection(from: 'r53', to: 'cf'),
    _ArchConnection(from: 'cf', to: 's3'),
    _ArchConnection(from: 'r53', to: 'alb'),
    _ArchConnection(from: 'alb', to: 'ec2_1'),
    _ArchConnection(from: 'alb', to: 'ec2_2'),
    _ArchConnection(from: 'ec2_1', to: 'rds'),
    _ArchConnection(from: 'ec2_2', to: 'rds'),
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
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
              const Icon(Icons.cloud_sync, color: AppTheme.accent, size: 32),
              const SizedBox(width: 16),
              Text(
                'CLOUD OPERATIONS CENTER',
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
              height: 500, // Fixed height for the diagram
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
                            painter: _ArchitecturePainter(
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
                          left: constraints.maxWidth * node.x - 40, // 40 is half of node width
                          top: constraints.maxHeight * node.y - 40,
                          child: _InteractiveNode(node: node),
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

class _InteractiveNode extends StatefulWidget {
  final _ArchNode node;
  const _InteractiveNode({required this.node});

  @override
  State<_InteractiveNode> createState() => _InteractiveNodeState();
}

class _InteractiveNodeState extends State<_InteractiveNode> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: Tooltip(
        message: widget.node.info,
        textStyle: const TextStyle(color: Colors.white, fontSize: 12),
        decoration: BoxDecoration(
          color: AppTheme.background.withValues(alpha: 0.9),
          border: Border.all(color: AppTheme.accent),
          borderRadius: BorderRadius.circular(8),
        ),
        child: AnimatedScale(
          scale: _isHovered ? 1.2 : 1.0,
          duration: const Duration(milliseconds: 200),
          child: Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: AppTheme.primary.withValues(alpha: 0.2),
              shape: BoxShape.circle,
              border: Border.all(
                color: _isHovered ? AppTheme.accent : AppTheme.secondary,
                width: _isHovered ? 2 : 1,
              ),
              boxShadow: _isHovered
                  ? [
                      BoxShadow(color: AppTheme.accent.withValues(alpha: 0.5), blurRadius: 15),
                    ]
                  : [],
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  widget.node.icon,
                  color: _isHovered ? AppTheme.accent : Colors.white,
                  size: 32,
                ),
                const SizedBox(height: 4),
                Text(
                  widget.node.label,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 9, color: Colors.white70),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ArchitecturePainter extends CustomPainter {
  final List<_ArchNode> nodes;
  final List<_ArchConnection> connections;
  final double animationValue;

  _ArchitecturePainter({
    required this.nodes,
    required this.connections,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final linePaint = Paint()
      ..color = AppTheme.secondary.withValues(alpha: 0.3)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final packetPaint = Paint()
      ..color = AppTheme.accent
      ..style = PaintingStyle.fill
      ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 3); // Neon glow for packet

    for (var conn in connections) {
      final fromNode = nodes.firstWhere((n) => n.id == conn.from);
      final toNode = nodes.firstWhere((n) => n.id == conn.to);

      final p1 = Offset(size.width * fromNode.x, size.height * fromNode.y);
      final p2 = Offset(size.width * toNode.x, size.height * toNode.y);

      // Draw dashed line or solid line
      canvas.drawLine(p1, p2, linePaint);

      // Calculate packet position
      // We can have multiple packets per line by using modulo
      for (int i = 0; i < 3; i++) {
        double t = (animationValue + (i * 0.33)) % 1.0;
        final packetX = p1.dx + (p2.dx - p1.dx) * t;
        final packetY = p1.dy + (p2.dy - p1.dy) * t;
        
        canvas.drawCircle(Offset(packetX, packetY), 4, packetPaint);
      }
    }
  }

  @override
  bool shouldRepaint(covariant _ArchitecturePainter oldDelegate) => true;
}

class _ArchNode {
  final String id;
  final String label;
  final IconData icon;
  final double x;
  final double y;
  final String info;

  _ArchNode({
    required this.id,
    required this.label,
    required this.icon,
    required this.x,
    required this.y,
    required this.info,
  });
}

class _ArchConnection {
  final String from;
  final String to;

  _ArchConnection({required this.from, required this.to});
}
