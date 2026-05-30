import 'dart:math';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/animations/anti_gravity_widget.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class ProjectsShowcaseSection extends StatelessWidget {
  const ProjectsShowcaseSection({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width > 800;

    final projects = [
      _ProjectData(
        title: 'CropMitra',
        description: 'An AI-powered agricultural assistant helping farmers with crop disease detection, yield prediction, and market insights using machine learning models.',
        tags: ['Flutter', 'Python', 'TensorFlow', 'Firebase'],
        githubLink: '#',
        demoLink: '#',
        imagePlaceholder: Icons.agriculture,
      ),
      _ProjectData(
        title: 'SignTalk',
        description: 'Real-time sign language translation application utilizing computer vision to bridge the communication gap for the deaf and hard of hearing community.',
        tags: ['Python', 'OpenCV', 'AWS EC2', 'WebSockets'],
        githubLink: '#',
        demoLink: '#',
        imagePlaceholder: Icons.sign_language,
      ),
      _ProjectData(
        title: 'SmartMed',
        description: 'A comprehensive healthcare management platform connecting patients with doctors, featuring telemedicine, appointment booking, and encrypted health records.',
        tags: ['Flutter', 'Node.js', 'MongoDB', 'Docker'],
        githubLink: '#',
        demoLink: '#',
        imagePlaceholder: Icons.local_hospital,
      ),
      _ProjectData(
        title: 'Food Ordering App',
        description: 'A scalable food delivery application with real-time driver tracking, payment gateway integration, and a sophisticated vendor management dashboard.',
        tags: ['Flutter', 'Stripe', 'Firebase', 'Google Maps'],
        githubLink: '#',
        demoLink: '#',
        imagePlaceholder: Icons.fastfood,
      ),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.apps, color: AppTheme.secondary, size: 32),
              const SizedBox(width: 16),
              Text(
                'DEPLOYED PROTOCOLS (PROJECTS)',
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
              ? GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 1.5,
                    crossAxisSpacing: 32,
                    mainAxisSpacing: 32,
                  ),
                  itemCount: projects.length,
                  itemBuilder: (context, index) {
                    return AntiGravityWidget(
                      delay: Duration(milliseconds: index * 200),
                      duration: const Duration(seconds: 5),
                      child: _ProjectCard3D(project: projects[index]),
                    );
                  },
                )
              : ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: projects.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 32),
                  itemBuilder: (context, index) {
                    return AntiGravityWidget(
                      delay: Duration(milliseconds: index * 200),
                      duration: const Duration(seconds: 5),
                      child: SizedBox(
                        height: 350,
                        child: _ProjectCard3D(project: projects[index]),
                      ),
                    );
                  },
                ),
        ],
      ),
    );
  }
}

class _ProjectCard3D extends StatefulWidget {
  final _ProjectData project;

  const _ProjectCard3D({required this.project});

  @override
  State<_ProjectCard3D> createState() => _ProjectCard3DState();
}

class _ProjectCard3DState extends State<_ProjectCard3D> {
  double _xRotation = 0.0;
  double _yRotation = 0.0;
  bool _isHovered = false;

  void _onHover(PointerHoverEvent event, Size size) {
    // Normalize coordinates from -1 to 1 based on center of card
    final dx = (event.localPosition.dx - size.width / 2) / (size.width / 2);
    final dy = (event.localPosition.dy - size.height / 2) / (size.height / 2);

    setState(() {
      // Max tilt is 15 degrees (~0.26 radians)
      _yRotation = dx * 0.15;
      _xRotation = -dy * 0.15; // Invert Y for intuitive tilt
    });
  }

  void _onExit(PointerExitEvent event) {
    setState(() {
      _xRotation = 0.0;
      _yRotation = 0.0;
      _isHovered = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final size = Size(constraints.maxWidth, constraints.maxHeight);

        return MouseRegion(
          onEnter: (_) => setState(() => _isHovered = true),
          onHover: (e) => _onHover(e, size),
          onExit: _onExit,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOutCubic,
            transform: Matrix4.identity()
              ..setEntry(3, 2, 0.001) // perspective
              ..rotateX(_xRotation)
              ..rotateY(_yRotation)
              ..scale(_isHovered ? 1.05 : 1.0),
            alignment: FractionalOffset.center,
            child: GlassPanel(
              padding: 0,
              blur: _isHovered ? 20.0 : 10.0,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: LinearGradient(
                    colors: [
                      AppTheme.primary.withValues(alpha: _isHovered ? 0.2 : 0.05),
                      Colors.transparent,
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  boxShadow: _isHovered
                      ? [
                          BoxShadow(
                            color: AppTheme.accent.withValues(alpha: 0.2),
                            blurRadius: 30,
                            spreadRadius: 2,
                          )
                        ]
                      : [],
                ),
                child: Padding(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(widget.project.imagePlaceholder, color: AppTheme.accent, size: 40),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Text(
                              widget.project.title,
                              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                            ),
                          ),
                          if (_isHovered)
                            const Icon(Icons.arrow_outward, color: AppTheme.secondary).animate().fade().slideX(),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Expanded(
                        child: Text(
                          widget.project.description,
                          style: const TextStyle(color: Colors.white70, height: 1.5),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: widget.project.tags.map((tag) {
                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppTheme.secondary.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(color: AppTheme.secondary.withValues(alpha: 0.3)),
                            ),
                            child: Text(tag, style: const TextStyle(color: AppTheme.secondary, fontSize: 12)),
                          );
                        }).toList(),
                      ),
                      const SizedBox(height: 24),
                      Row(
                        children: [
                          _buildActionButton('Live Demo', Icons.play_arrow, AppTheme.accent),
                          const SizedBox(width: 16),
                          _buildActionButton('GitHub', Icons.code, Colors.white),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildActionButton(String label, IconData icon, Color color) {
    return ElevatedButton.icon(
      onPressed: () {},
      icon: Icon(icon, color: color, size: 16),
      label: Text(label, style: TextStyle(color: color)),
      style: ElevatedButton.styleFrom(
        backgroundColor: color.withValues(alpha: 0.1),
        side: BorderSide(color: color.withValues(alpha: 0.5)),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }
}

class _ProjectData {
  final String title;
  final String description;
  final List<String> tags;
  final String githubLink;
  final String demoLink;
  final IconData imagePlaceholder;

  _ProjectData({
    required this.title,
    required this.description,
    required this.tags,
    required this.githubLink,
    required this.demoLink,
    required this.imagePlaceholder,
  });
}
