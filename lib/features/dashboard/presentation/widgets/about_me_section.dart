import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/animations/anti_gravity_widget.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class AboutMeSection extends StatelessWidget {
  const AboutMeSection({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width > 800;

    return AntiGravityWidget(
      delay: 500.ms,
      duration: const Duration(seconds: 6),
      child: GlassPanel(
        padding: 32.0,
        child: isDesktop ? _buildDesktopLayout(context) : _buildMobileLayout(context),
      ),
    );
  }

  Widget _buildDesktopLayout(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Left: Profile & Objective
        Expanded(
          flex: 2,
          child: _buildProfileAndObjective(context),
        ),
        const SizedBox(width: 48),
        // Middle: Education & Certs
        Expanded(
          flex: 3,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildEducationTimeline(context),
              const SizedBox(height: 32),
              _buildCertifications(context),
            ],
          ),
        ),
        const SizedBox(width: 48),
        // Right: Skills Chips
        Expanded(
          flex: 2,
          child: _buildSkillsRadar(context),
        ),
      ],
    );
  }

  Widget _buildMobileLayout(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildProfileAndObjective(context),
        const SizedBox(height: 32),
        _buildEducationTimeline(context),
        const SizedBox(height: 32),
        _buildCertifications(context),
        const SizedBox(height: 32),
        _buildSkillsRadar(context),
      ],
    );
  }

  Widget _buildProfileAndObjective(BuildContext context) {
    return Column(
      children: [
        // Floating Hologram Profile Image
        Container(
          width: 150,
          height: 150,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: AppTheme.accent, width: 2),
            boxShadow: [
              BoxShadow(
                color: AppTheme.secondary.withValues(alpha: 0.5),
                blurRadius: 30,
                spreadRadius: 5,
              ),
            ],
            image: const DecorationImage(
              image: NetworkImage('https://via.placeholder.com/150'), // Hologram placeholder
              fit: BoxFit.cover,
            ),
          ),
        ).animate(onPlay: (c) => c.repeat(reverse: true))
         .shimmer(duration: 2.seconds, color: AppTheme.accent.withValues(alpha: 0.2))
         .scale(begin: const Offset(0.95, 0.95), end: const Offset(1.05, 1.05), duration: 3.seconds),
        
        const SizedBox(height: 24),
        Text(
          'IDENTIFICATION ALIAS',
          style: TextStyle(color: AppTheme.accent, fontSize: 10, letterSpacing: 2),
        ),
        Text(
          'VENKAT',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'MISSION OBJECTIVE',
          style: TextStyle(color: AppTheme.secondary, fontSize: 12, letterSpacing: 1.5),
        ),
        const SizedBox(height: 8),
        const Text(
          'To architect scalable cloud infrastructure and develop high-performance, cross-platform applications that push the boundaries of modern UI/UX design.',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.white70, height: 1.5),
        ),
      ],
    );
  }

  Widget _buildEducationTimeline(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.school, color: AppTheme.accent),
            const SizedBox(width: 8),
            Text(
              'ACADEMIC TIMELINE',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
            ),
          ],
        ),
        const SizedBox(height: 24),
        _TimelineItem(
          year: '2022 - 2026',
          title: 'B.Tech in Computer Science',
          institution: 'XYZ University',
          highlight: 'CGPA: 9.2 / 10.0',
        ),
        _TimelineItem(
          year: '2020 - 2022',
          title: 'Higher Secondary Education',
          institution: 'ABC Junior College',
          highlight: 'Grade: 95%',
        ),
      ],
    );
  }

  Widget _buildCertifications(BuildContext context) {
    final certs = [
      'AWS Certified Solutions Architect',
      'Google Cloud Professional Developer',
      'Flutter Certified Expert',
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.verified, color: AppTheme.secondary),
            const SizedBox(width: 8),
            Text(
              'SECURITY CLEARANCES (CERTIFICATIONS)',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(color: Colors.white),
            ),
          ],
        ),
        const SizedBox(height: 16),
        ...certs.map((c) => Padding(
          padding: const EdgeInsets.only(bottom: 8.0),
          child: Row(
            children: [
              const Icon(Icons.check_circle_outline, color: AppTheme.accent, size: 16),
              const SizedBox(width: 8),
              Text(c, style: const TextStyle(color: Colors.white70)),
            ],
          ).animate().fade(duration: 500.ms).slideX(),
        )).toList(),
      ],
    );
  }

  Widget _buildSkillsRadar(BuildContext context) {
    final skills = [
      'Flutter', 'Dart', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Firebase', 'Node.js', 'Python', 'Terraform'
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const Icon(Icons.memory, color: AppTheme.primary),
            const SizedBox(width: 8),
            Text(
              'COMBAT ABILITIES',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
            ),
          ],
        ),
        const SizedBox(height: 24),
        Wrap(
          spacing: 8,
          runSpacing: 12,
          children: skills.map((skill) {
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppTheme.primary.withValues(alpha: 0.1),
                border: Border.all(color: AppTheme.primary.withValues(alpha: 0.5)),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.primary.withValues(alpha: 0.2),
                    blurRadius: 10,
                  ),
                ],
              ),
              child: Text(
                skill,
                style: const TextStyle(color: AppTheme.secondary, fontWeight: FontWeight.bold),
              ),
            ).animate(onPlay: (c) => c.repeat(reverse: true))
             .shimmer(duration: 3.seconds, color: Colors.white)
             .moveY(begin: -2, end: 2, duration: 2.seconds);
          }).toList(),
        ),
      ],
    );
  }
}

class _TimelineItem extends StatelessWidget {
  final String year;
  final String title;
  final String institution;
  final String highlight;

  const _TimelineItem({
    required this.year,
    required this.title,
    required this.institution,
    required this.highlight,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline line and dot
          Column(
            children: [
              Container(
                width: 12,
                height: 12,
                decoration: const BoxDecoration(
                  color: AppTheme.accent,
                  shape: BoxShape.circle,
                ),
              ),
              Container(
                width: 2,
                height: 60,
                color: AppTheme.accent.withValues(alpha: 0.3),
              ),
            ],
          ),
          const SizedBox(width: 16),
          // Content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(year, style: const TextStyle(color: AppTheme.secondary, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text(title, style: const TextStyle(color: Colors.white, fontSize: 16)),
                const SizedBox(height: 4),
                Text(institution, style: const TextStyle(color: Colors.white70)),
                const SizedBox(height: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.accent.withValues(alpha: 0.1),
                    border: Border.all(color: AppTheme.accent.withValues(alpha: 0.3)),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(highlight, style: const TextStyle(color: AppTheme.accent, fontSize: 12)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
