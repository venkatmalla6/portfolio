import 'package:flutter/material.dart';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../shared/animations/anti_gravity_widget.dart';
import 'particle_network_painter.dart';

class HeroSection extends StatefulWidget {
  const HeroSection({super.key});

  @override
  State<HeroSection> createState() => _HeroSectionState();
}

class _HeroSectionState extends State<HeroSection> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Particle> _particles;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..repeat();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final size = MediaQuery.of(context).size;
    // Initialize particles once we have the size
    _particles = List.generate(40, (_) => Particle.random(size));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return SizedBox(
      width: double.infinity,
      height: size.height * 0.8,
      child: Stack(
        children: [
          // 1. Particle System Background
          AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return CustomPaint(
                size: Size.infinite,
                painter: ParticleNetworkPainter(
                  particles: _particles,
                  animationValue: _controller.value,
                ),
              );
            },
          ),
          
          // 2. Animated Earth (Background Right)
          Positioned(
            right: size.width * 0.1,
            top: size.height * 0.15,
            child: AntiGravityWidget(
              duration: const Duration(seconds: 6),
              child: Container(
                width: 300,
                height: 300,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: RadialGradient(
                    colors: [
                      AppTheme.secondary.withValues(alpha: 0.2),
                      AppTheme.primary.withValues(alpha: 0.05),
                      Colors.transparent,
                    ],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.primary.withValues(alpha: 0.3),
                      blurRadius: 100,
                      spreadRadius: 20,
                    ),
                  ],
                ),
                child: Center(
                  child: Icon(
                    Icons.public,
                    size: 250,
                    color: AppTheme.accent.withValues(alpha: 0.3),
                  ).animate(onPlay: (c) => c.repeat()).rotate(duration: 30.seconds),
                ),
              ),
            ),
          ),

          // 3. Floating AWS Cloud Nodes
          Positioned(
            right: size.width * 0.3,
            top: size.height * 0.1,
            child: const AntiGravityWidget(
              delay: Duration(milliseconds: 500),
              duration: Duration(seconds: 4),
              child: _CloudNode(label: 'AWS EC2', icon: Icons.cloud_queue),
            ),
          ),
          Positioned(
            right: size.width * 0.05,
            bottom: size.height * 0.2,
            child: const AntiGravityWidget(
              delay: Duration(seconds: 1),
              duration: Duration(seconds: 5),
              child: _CloudNode(label: 'S3 Bucket', icon: Icons.storage),
            ),
          ),
          Positioned(
            right: size.width * 0.25,
            bottom: size.height * 0.15,
            child: const AntiGravityWidget(
              delay: Duration(milliseconds: 1500),
              duration: Duration(seconds: 7),
              child: _CloudNode(label: 'Lambda', icon: Icons.code),
            ),
          ),

          // 4. Foreground Content (Text & CTA)
          Positioned(
            left: size.width > 800 ? size.width * 0.1 : 24,
            top: size.height * 0.25,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SYSTEM ONLINE',
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                        color: AppTheme.accent,
                        letterSpacing: 4.0,
                      ),
                ).animate().fade().slideX(begin: -0.2),
                const SizedBox(height: 16),
                Text(
                  'Malla Venkat',
                  style: Theme.of(context).textTheme.displayLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                        fontSize: size.width > 800 ? 80 : 48,
                        color: Colors.white,
                        shadows: [
                          Shadow(
                            color: AppTheme.primary.withValues(alpha: 0.5),
                            blurRadius: 20,
                          ),
                        ],
                      ),
                ).animate(delay: 300.ms).fade().shimmer(duration: 2.seconds),
                const SizedBox(height: 16),
                SizedBox(
                  height: 40,
                  child: DefaultTextStyle(
                    style: Theme.of(context).textTheme.headlineSmall!.copyWith(
                          color: AppTheme.secondary,
                          fontWeight: FontWeight.w300,
                        ),
                    child: AnimatedTextKit(
                      repeatForever: true,
                      animatedTexts: [
                        TypewriterAnimatedText('Cloud Engineer', speed: const Duration(milliseconds: 100)),
                        TypewriterAnimatedText('DevOps Enthusiast', speed: const Duration(milliseconds: 100)),
                        TypewriterAnimatedText('Flutter Developer', speed: const Duration(milliseconds: 100)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 48),
                Row(
                  children: [
                    _buildGlowButton(
                      'DOWNLOAD RESUME',
                      Icons.download,
                      isPrimary: true,
                    ),
                    const SizedBox(width: 24),
                    _buildGlowButton(
                      'VIEW PROJECTS',
                      Icons.visibility,
                      isPrimary: false,
                    ),
                  ],
                ).animate(delay: 800.ms).fade().slideY(begin: 0.5),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGlowButton(String text, IconData icon, {required bool isPrimary}) {
    final color = isPrimary ? AppTheme.accent : AppTheme.primary;
    return Container(
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.3),
            blurRadius: 20,
            spreadRadius: 2,
          ),
        ],
      ),
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: isPrimary ? color.withValues(alpha: 0.1) : Colors.transparent,
          side: BorderSide(color: color, width: 2),
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
        child: Row(
          children: [
            Icon(icon, color: color),
            const SizedBox(width: 12),
            Text(
              text,
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CloudNode extends StatelessWidget {
  final String label;
  final IconData icon;

  const _CloudNode({required this.label, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.background.withValues(alpha: 0.8),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.primary.withValues(alpha: 0.5)),
        boxShadow: [
          BoxShadow(
            color: AppTheme.primary.withValues(alpha: 0.2),
            blurRadius: 15,
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: AppTheme.secondary, size: 32),
          const SizedBox(height: 8),
          Text(
            label,
            style: const TextStyle(color: AppTheme.accent, fontSize: 12),
          ),
        ],
      ),
    );
  }
}
