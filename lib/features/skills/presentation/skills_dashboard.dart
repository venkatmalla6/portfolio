import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/animations/anti_gravity_widget.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class SkillsDashboard extends StatelessWidget {
  const SkillsDashboard({super.key});

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
              const Icon(Icons.radar, color: AppTheme.accent, size: 32),
              const SizedBox(width: 16),
              Text(
                'SYSTEM CAPABILITIES (SKILLS)',
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
                    Expanded(child: _buildCategory('CLOUD INFRASTRUCTURE', _cloudSkills, 0)),
                    const SizedBox(width: 24),
                    Expanded(child: _buildCategory('DEVOPS PIPELINE', _devOpsSkills, 200)),
                    const SizedBox(width: 24),
                    Expanded(child: _buildCategory('CORE PROGRAMMING', _programmingSkills, 400)),
                    const SizedBox(width: 24),
                    Expanded(child: _buildCategory('NETWORKING', _networkingSkills, 600)),
                  ],
                )
              : Column(
                  children: [
                    _buildCategory('CLOUD INFRASTRUCTURE', _cloudSkills, 0),
                    const SizedBox(height: 24),
                    _buildCategory('DEVOPS PIPELINE', _devOpsSkills, 200),
                    const SizedBox(height: 24),
                    _buildCategory('CORE PROGRAMMING', _programmingSkills, 400),
                    const SizedBox(height: 24),
                    _buildCategory('NETWORKING', _networkingSkills, 600),
                  ],
                ),
        ],
      ),
    );
  }

  Widget _buildCategory(String title, List<_SkillData> skills, int delayMs) {
    return AntiGravityWidget(
      delay: Duration(milliseconds: delayMs),
      duration: const Duration(seconds: 5),
      child: GlassPanel(
        padding: 24.0,
        child: Column(
          children: [
            Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppTheme.secondary,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
            const SizedBox(height: 24),
            Wrap(
              spacing: 24,
              runSpacing: 24,
              alignment: WrapAlignment.center,
              children: skills.map((s) => _HoverSkillItem(skill: s)).toList(),
            ),
          ],
        ),
      ),
    ).animate().fade(delay: Duration(milliseconds: delayMs)).slideY(begin: 0.2);
  }
}

class _HoverSkillItem extends StatefulWidget {
  final _SkillData skill;
  const _HoverSkillItem({required this.skill});

  @override
  State<_HoverSkillItem> createState() => _HoverSkillItemState();
}

class _HoverSkillItemState extends State<_HoverSkillItem> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedScale(
        scale: _isHovered ? 1.15 : 1.0,
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOutBack,
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            boxShadow: _isHovered
                ? [
                    BoxShadow(
                      color: AppTheme.accent.withValues(alpha: 0.5),
                      blurRadius: 20,
                      spreadRadius: 2,
                    )
                  ]
                : [],
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              SizedBox(
                width: 80,
                height: 80,
                child: TweenAnimationBuilder<double>(
                  tween: Tween<double>(begin: 0, end: widget.skill.level),
                  duration: const Duration(seconds: 2),
                  curve: Curves.easeOutCubic,
                  builder: (context, value, _) {
                    return CircularProgressIndicator(
                      value: value,
                      strokeWidth: 6,
                      backgroundColor: AppTheme.primary.withValues(alpha: 0.2),
                      color: _isHovered ? AppTheme.accent : AppTheme.secondary,
                    );
                  },
                ),
              ),
              Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    widget.skill.icon,
                    size: 24,
                    color: _isHovered ? Colors.white : AppTheme.secondary,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    widget.skill.name,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: _isHovered ? AppTheme.accent : Colors.white70,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SkillData {
  final String name;
  final double level;
  final IconData icon;

  const _SkillData(this.name, this.level, this.icon);
}

const _cloudSkills = [
  _SkillData('AWS', 0.9, Icons.cloud),
  _SkillData('EC2', 0.85, Icons.dns),
  _SkillData('S3', 0.9, Icons.storage),
  _SkillData('IAM', 0.8, Icons.security),
  _SkillData('VPC', 0.75, Icons.hub),
];

const _devOpsSkills = [
  _SkillData('Docker', 0.9, Icons.view_in_ar),
  _SkillData('Jenkins', 0.8, Icons.build),
  _SkillData('GitHub\nActions', 0.85, Icons.api),
];

const _programmingSkills = [
  _SkillData('Python', 0.95, Icons.code),
  _SkillData('Flutter', 0.9, Icons.smartphone),
  _SkillData('Firebase', 0.85, Icons.local_fire_department),
];

const _networkingSkills = [
  _SkillData('TCP/IP', 0.8, Icons.language),
  _SkillData('Routing', 0.75, Icons.router),
  _SkillData('Switching', 0.7, Icons.compare_arrows),
  _SkillData('DNS', 0.85, Icons.explore),
];
