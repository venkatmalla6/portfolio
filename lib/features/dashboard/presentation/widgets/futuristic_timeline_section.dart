import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class FuturisticTimelineSection extends StatelessWidget {
  const FuturisticTimelineSection({super.key});

  @override
  Widget build(BuildContext context) {
    final timelineData = [
      _TimelineEvent(
        title: 'BTech Journey',
        subtitle: 'XYZ University',
        description: 'Pursuing a degree in Computer Science with a focus on cloud computing and software engineering. Current CGPA: 9.2.',
        icon: Icons.school,
      ),
      _TimelineEvent(
        title: 'CSOP Project',
        subtitle: 'Community Service Oriented Project',
        description: 'Developed an innovative digital solution to aid local NGOs in resource distribution and management.',
        icon: Icons.groups,
      ),
      _TimelineEvent(
        title: 'Certifications',
        subtitle: 'AWS & Google Cloud',
        description: 'Obtained AWS Certified Solutions Architect and Google Cloud Professional Developer certifications to validate cloud expertise.',
        icon: Icons.verified,
      ),
      _TimelineEvent(
        title: 'Internships',
        subtitle: 'Software Engineering Intern',
        description: 'Worked with a high-growth startup to optimize their backend services, reducing latency by 40%.',
        icon: Icons.work,
      ),
      _TimelineEvent(
        title: 'Achievements',
        subtitle: 'Hackathon Winner',
        description: 'Secured 1st place at the National Cloud Computing Hackathon by building a serverless disaster recovery architecture.',
        icon: Icons.emoji_events,
      ),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.history_toggle_off, color: AppTheme.accent, size: 32),
              const SizedBox(width: 16),
              Text(
                'CHRONOLOGICAL LOGS (TIMELINE)',
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
            padding: 32.0,
            child: ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: timelineData.length,
              itemBuilder: (context, index) {
                final isLast = index == timelineData.length - 1;
                return _InteractiveTimelineNode(
                  event: timelineData[index],
                  isLast: isLast,
                  delayMs: index * 300,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _InteractiveTimelineNode extends StatefulWidget {
  final _TimelineEvent event;
  final bool isLast;
  final int delayMs;

  const _InteractiveTimelineNode({
    required this.event,
    required this.isLast,
    required this.delayMs,
  });

  @override
  State<_InteractiveTimelineNode> createState() => _InteractiveTimelineNodeState();
}

class _InteractiveTimelineNodeState extends State<_InteractiveTimelineNode> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: Stack(
        children: [
          // Timeline line
          if (!widget.isLast)
            Positioned(
              left: 11, // Center relative to the 24px icon
              top: 24,
              bottom: 0,
              child: Container(
                width: 2,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      AppTheme.accent.withValues(alpha: _isHovered ? 1.0 : 0.3),
                      AppTheme.accent.withValues(alpha: 0.1),
                    ],
                  ),
                ),
              ),
            ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Glowing node
              AnimatedScale(
                scale: _isHovered ? 1.5 : 1.0,
                duration: const Duration(milliseconds: 200),
                child: Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: _isHovered ? AppTheme.accent : AppTheme.background,
                    border: Border.all(
                      color: _isHovered ? Colors.white : AppTheme.accent,
                      width: 2,
                    ),
                    boxShadow: _isHovered
                        ? [BoxShadow(color: AppTheme.accent, blurRadius: 15, spreadRadius: 2)]
                        : [BoxShadow(color: AppTheme.accent.withValues(alpha: 0.5), blurRadius: 5)],
                  ),
                  child: Center(
                    child: Icon(
                      widget.event.icon,
                      size: 12,
                      color: _isHovered ? AppTheme.background : AppTheme.accent,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 24),
              // Content
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.only(bottom: 32.0),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: _isHovered
                          ? AppTheme.primary.withValues(alpha: 0.2)
                          : AppTheme.primary.withValues(alpha: 0.05),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: _isHovered ? AppTheme.secondary : AppTheme.secondary.withValues(alpha: 0.2),
                      ),
                      boxShadow: _isHovered
                          ? [BoxShadow(color: AppTheme.secondary.withValues(alpha: 0.2), blurRadius: 20)]
                          : [],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.event.title,
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                color: _isHovered ? AppTheme.accent : Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          widget.event.subtitle,
                          style: const TextStyle(
                            color: AppTheme.secondary,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 1.2,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          widget.event.description,
                          style: const TextStyle(color: Colors.white70, height: 1.5),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    ).animate().fade(delay: Duration(milliseconds: widget.delayMs)).slideY(begin: 0.2);
  }
}

class _TimelineEvent {
  final String title;
  final String subtitle;
  final String description;
  final IconData icon;

  _TimelineEvent({
    required this.title,
    required this.subtitle,
    required this.description,
    required this.icon,
  });
}
