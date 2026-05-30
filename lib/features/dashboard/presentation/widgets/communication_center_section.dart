import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../../../shared/animations/anti_gravity_widget.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class CommunicationCenterSection extends StatelessWidget {
  const CommunicationCenterSection({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width > 800;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.radar, color: AppTheme.secondary, size: 32),
              const SizedBox(width: 16),
              Text(
                'SECURE COMMS CENTER',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
              ).animate().fade().slideX(),
            ],
          ),
          const SizedBox(height: 32),
          isDesktop
              ? Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 5,
                      child: _buildHolographicForm(context),
                    ),
                    const SizedBox(width: 48),
                    Expanded(
                      flex: 4,
                      child: _buildFloatingContactCards(),
                    ),
                  ],
                )
              : Column(
                  children: [
                    _buildFloatingContactCards(),
                    const SizedBox(height: 48),
                    _buildHolographicForm(context),
                  ],
                ),
        ],
      ),
    );
  }

  Widget _buildHolographicForm(BuildContext context) {
    return AntiGravityWidget(
      delay: 500.ms,
      duration: const Duration(seconds: 8),
      child: GlassPanel(
        padding: 32.0,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.terminal, color: AppTheme.accent),
                SizedBox(width: 8),
                Text(
                  'TRANSMIT ENCRYPTED MESSAGE',
                  style: TextStyle(color: AppTheme.accent, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildHoloTextField('CALLSIGN (NAME)'),
            const SizedBox(height: 16),
            _buildHoloTextField('ROUTING ADDRESS (EMAIL)'),
            const SizedBox(height: 16),
            _buildHoloTextField('PAYLOAD (MESSAGE)', maxLines: 4),
            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary.withValues(alpha: 0.2),
                  side: const BorderSide(color: AppTheme.primary, width: 2),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: const Text(
                  'INITIALIZE TRANSMISSION',
                  style: TextStyle(color: Colors.white, letterSpacing: 2, fontWeight: FontWeight.bold),
                ),
              ).animate(onPlay: (c) => c.repeat(reverse: true)).shimmer(duration: 2.seconds, color: AppTheme.accent),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHoloTextField(String label, {int maxLines = 1}) {
    return TextField(
      maxLines: maxLines,
      style: const TextStyle(color: Colors.white),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: AppTheme.secondary.withValues(alpha: 0.5), fontSize: 12, letterSpacing: 2),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: BorderSide(color: AppTheme.secondary.withValues(alpha: 0.3)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
          borderSide: const BorderSide(color: AppTheme.accent, width: 2),
        ),
        fillColor: AppTheme.background.withValues(alpha: 0.5),
        filled: true,
      ),
    );
  }

  Widget _buildFloatingContactCards() {
    return Column(
      children: [
        Row(
          children: [
            Expanded(child: _buildContactCard('EMAIL', 'venkat@example.com', const Icon(Icons.email), AppTheme.accent, 0)),
            const SizedBox(width: 16),
            Expanded(child: _buildContactCard('PHONE', '+91 98765 43210', const Icon(Icons.phone), AppTheme.secondary, 200)),
          ],
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _buildContactCard(
                'LINKEDIN',
                'linkedin.com/in/venkat',
                const FaIcon(FontAwesomeIcons.linkedin),
                const Color(0xFF0077B5), // Official Blue
                400,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: _buildContactCard(
                'GITHUB',
                'github.com/venkat',
                const FaIcon(FontAwesomeIcons.github),
                const Color(0xFF333333), // Dark GitHub
                600,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildContactCard(String title, String value, Widget iconWidget, Color color, int delayMs) {
    return AntiGravityWidget(
      delay: Duration(milliseconds: delayMs),
      duration: const Duration(seconds: 4),
      child: _HoverContactCard(title: title, value: value, iconWidget: iconWidget, color: color),
    );
  }
}

class _HoverContactCard extends StatefulWidget {
  final String title;
  final String value;
  final Widget iconWidget;
  final Color color;

  const _HoverContactCard({
    required this.title,
    required this.value,
    required this.iconWidget,
    required this.color,
  });

  @override
  State<_HoverContactCard> createState() => _HoverContactCardState();
}

class _HoverContactCardState extends State<_HoverContactCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: _isHovered ? widget.color.withValues(alpha: 0.2) : AppTheme.background.withValues(alpha: 0.8),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: _isHovered ? widget.color : widget.color.withValues(alpha: 0.3),
            width: _isHovered ? 2 : 1,
          ),
          boxShadow: _isHovered
              ? [BoxShadow(color: widget.color.withValues(alpha: 0.4), blurRadius: 20)]
              : [],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconTheme(
              data: IconThemeData(
                color: _isHovered ? Colors.white : widget.color,
                size: 32,
              ),
              child: widget.iconWidget,
            ),
            const SizedBox(height: 16),
            Text(
              widget.title,
              style: TextStyle(
                color: widget.color == const Color(0xFF333333) ? Colors.white : widget.color,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              widget.value,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white70, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}
