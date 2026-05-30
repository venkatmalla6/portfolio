import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../shared/animations/anti_gravity_widget.dart';
import '../../../../core/theme/app_theme.dart';

class RecruiterDashboardSection extends StatelessWidget {
  const RecruiterDashboardSection({super.key});

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
              const Icon(Icons.assignment_ind, color: AppTheme.accent, size: 32),
              const SizedBox(width: 16),
              Text(
                'RECRUITER FAST-TRACK',
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
                    Expanded(flex: 3, child: _buildAtsAndContact(context)),
                    const SizedBox(width: 24),
                    Expanded(flex: 4, child: _buildResumeAndCerts(context)),
                    const SizedBox(width: 24),
                    Expanded(flex: 3, child: _buildSkillsAndEdu(context)),
                  ],
                )
              : Column(
                  children: [
                    _buildAtsAndContact(context),
                    const SizedBox(height: 24),
                    _buildResumeAndCerts(context),
                    const SizedBox(height: 24),
                    _buildSkillsAndEdu(context),
                  ],
                ),
        ],
      ),
    );
  }

  Widget _buildAtsAndContact(BuildContext context) {
    return AntiGravityWidget(
      delay: const Duration(milliseconds: 100),
      duration: const Duration(seconds: 4),
      child: GlassPanel(
        padding: 32.0,
        child: Column(
          children: [
            const Text(
              'ATS COMPATIBILITY SCORE',
              style: TextStyle(color: AppTheme.secondary, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 24),
            Stack(
              alignment: Alignment.center,
              children: [
                SizedBox(
                  width: 120,
                  height: 120,
                  child: TweenAnimationBuilder<double>(
                    tween: Tween<double>(begin: 0, end: 0.98),
                    duration: const Duration(seconds: 2),
                    curve: Curves.easeOutBack,
                    builder: (context, value, _) {
                      return CircularProgressIndicator(
                        value: value,
                        strokeWidth: 8,
                        backgroundColor: AppTheme.primary.withValues(alpha: 0.2),
                        color: AppTheme.accent,
                      );
                    },
                  ),
                ),
                Column(
                  children: [
                    const Text(
                      '98%',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      'HIGH MATCH',
                      style: TextStyle(
                        color: AppTheme.accent.withValues(alpha: 0.8),
                        fontSize: 10,
                        letterSpacing: 1,
                      ),
                    ),
                  ],
                ),
              ],
            ).animate().scale(delay: 500.ms, curve: Curves.easeOutBack),
            const SizedBox(height: 32),
            const Divider(color: Colors.white24),
            const SizedBox(height: 16),
            _ContactItem(icon: Icons.email, text: 'venkat@example.com'),
            const SizedBox(height: 12),
            _ContactItem(icon: Icons.phone, text: '+91 98765 43210'),
            const SizedBox(height: 12),
            _ContactItem(icon: Icons.location_on, text: 'Hyderabad, India'),
            const SizedBox(height: 32),
            ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.download, color: AppTheme.background),
              label: const Text('DOWNLOAD RESUME', style: TextStyle(color: AppTheme.background, fontWeight: FontWeight.bold)),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.accent,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ).animate(onPlay: (c) => c.repeat(reverse: true)).shimmer(duration: 2.seconds, color: Colors.white54),
          ],
        ),
      ),
    );
  }

  Widget _buildResumeAndCerts(BuildContext context) {
    return AntiGravityWidget(
      delay: const Duration(milliseconds: 300),
      duration: const Duration(seconds: 5),
      child: GlassPanel(
        padding: 32.0,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.description, color: AppTheme.primary),
                SizedBox(width: 8),
                Text(
                  'RESUME PREVIEW',
                  style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              height: 180,
              width: double.infinity,
              decoration: BoxDecoration(
                color: AppTheme.background.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppTheme.primary.withValues(alpha: 0.3)),
              ),
              child: Stack(
                children: [
                  // Mock Document Lines
                  Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(height: 16, width: 120, color: AppTheme.secondary.withValues(alpha: 0.5)),
                        const SizedBox(height: 24),
                        Container(height: 8, width: double.infinity, color: Colors.white24),
                        const SizedBox(height: 12),
                        Container(height: 8, width: 200, color: Colors.white24),
                        const SizedBox(height: 24),
                        Container(height: 12, width: 80, color: AppTheme.accent.withValues(alpha: 0.5)),
                        const SizedBox(height: 16),
                        Container(height: 8, width: double.infinity, color: Colors.white24),
                        const SizedBox(height: 12),
                        Container(height: 8, width: 150, color: Colors.white24),
                      ],
                    ),
                  ),
                  Center(
                    child: Icon(Icons.remove_red_eye, size: 48, color: Colors.white.withValues(alpha: 0.1)),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'ACTIVE CERTIFICATIONS',
              style: TextStyle(color: AppTheme.secondary, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                _buildBadge('AWS Solutions Architect'),
                _buildBadge('Google Cloud Dev'),
                _buildBadge('Flutter Certified'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkillsAndEdu(BuildContext context) {
    return AntiGravityWidget(
      delay: const Duration(milliseconds: 500),
      duration: const Duration(seconds: 4),
      child: GlassPanel(
        padding: 32.0,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Row(
              children: [
                Icon(Icons.psychology, color: AppTheme.accent),
                SizedBox(width: 8),
                Text(
                  'SKILLS SUMMARY',
                  style: TextStyle(color: AppTheme.accent, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const _SkillBar(label: 'Flutter & Dart', value: 0.95),
            const SizedBox(height: 12),
            const _SkillBar(label: 'AWS & Cloud', value: 0.85),
            const SizedBox(height: 12),
            const _SkillBar(label: 'Python / Backend', value: 0.9),
            const SizedBox(height: 12),
            const _SkillBar(label: 'DevOps & CI/CD', value: 0.8),
            
            const SizedBox(height: 32),
            const Divider(color: Colors.white24),
            const SizedBox(height: 24),
            
            const Row(
              children: [
                Icon(Icons.school, color: AppTheme.secondary),
                SizedBox(width: 8),
                Text(
                  'EDUCATION',
                  style: TextStyle(color: AppTheme.secondary, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const Text('B.Tech Computer Science', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            const Text('XYZ University | 2022 - 2026', style: TextStyle(color: Colors.white70, fontSize: 12)),
            const SizedBox(height: 8),
            Text('CGPA: 9.2/10.0', style: TextStyle(color: AppTheme.accent, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildBadge(String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: AppTheme.secondary.withValues(alpha: 0.1),
        border: Border.all(color: AppTheme.secondary.withValues(alpha: 0.3)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.verified, color: AppTheme.secondary, size: 14),
          const SizedBox(width: 6),
          Text(text, style: const TextStyle(color: Colors.white, fontSize: 11)),
        ],
      ),
    );
  }
}

class _ContactItem extends StatelessWidget {
  final IconData icon;
  final String text;

  const _ContactItem({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: AppTheme.secondary, size: 16),
        const SizedBox(width: 12),
        Text(text, style: const TextStyle(color: Colors.white70, fontSize: 13)),
      ],
    );
  }
}

class _SkillBar extends StatelessWidget {
  final String label;
  final double value;

  const _SkillBar({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(color: Colors.white70, fontSize: 12)),
            Text('${(value * 100).toInt()}%', style: const TextStyle(color: AppTheme.accent, fontSize: 10, fontWeight: FontWeight.bold)),
          ],
        ),
        const SizedBox(height: 8),
        LayoutBuilder(
          builder: (context, constraints) {
            return Stack(
              children: [
                Container(
                  height: 6,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(3),
                  ),
                ),
                TweenAnimationBuilder<double>(
                  tween: Tween<double>(begin: 0, end: value),
                  duration: const Duration(seconds: 2),
                  curve: Curves.easeOutCubic,
                  builder: (context, val, _) {
                    return Container(
                      height: 6,
                      width: constraints.maxWidth * val, // Scales perfectly to parent
                      decoration: BoxDecoration(
                        color: AppTheme.accent,
                        borderRadius: BorderRadius.circular(3),
                        boxShadow: [BoxShadow(color: AppTheme.accent.withValues(alpha: 0.5), blurRadius: 4)],
                      ),
                    );
                  },
                ),
              ],
            );
          }
        ),
      ],
    );
  }
}
