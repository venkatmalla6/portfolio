import 'dart:math';
import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class ParticleNetworkPainter extends CustomPainter {
  final List<Particle> particles;
  final double animationValue;

  ParticleNetworkPainter({required this.particles, required this.animationValue});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppTheme.accent.withOpacity(0.3)
      ..strokeWidth = 1.0;

    final dotPaint = Paint()
      ..color = AppTheme.secondary.withOpacity(0.8)
      ..style = PaintingStyle.fill;

    // Update and draw particles
    for (var i = 0; i < particles.length; i++) {
      final p1 = particles[i];

      // Simple movement calculation based on animation tick
      final dx = p1.x + (cos(p1.angle) * p1.speed * animationValue * 100);
      final dy = p1.y + (sin(p1.angle) * p1.speed * animationValue * 100);

      // Wrap around bounds (simplified)
      final mappedX = dx % size.width;
      final mappedY = dy % size.height;
      
      final realX = mappedX < 0 ? mappedX + size.width : mappedX;
      final realY = mappedY < 0 ? mappedY + size.height : mappedY;

      canvas.drawCircle(Offset(realX, realY), p1.radius, dotPaint);

      // Draw lines between close particles
      for (var j = i + 1; j < particles.length; j++) {
        final p2 = particles[j];
        
        final dx2 = p2.x + (cos(p2.angle) * p2.speed * animationValue * 100);
        final dy2 = p2.y + (sin(p2.angle) * p2.speed * animationValue * 100);
        
        final mappedX2 = dx2 % size.width;
        final mappedY2 = dy2 % size.height;
        
        final realX2 = mappedX2 < 0 ? mappedX2 + size.width : mappedX2;
        final realY2 = mappedY2 < 0 ? mappedY2 + size.height : mappedY2;

        final dist = sqrt(pow(realX - realX2, 2) + pow(realY - realY2, 2));

        if (dist < 150) {
          paint.color = AppTheme.accent.withOpacity((150 - dist) / 150 * 0.4);
          canvas.drawLine(Offset(realX, realY), Offset(realX2, realY2), paint);
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant ParticleNetworkPainter oldDelegate) => true;
}

class Particle {
  final double x;
  final double y;
  final double radius;
  final double speed;
  final double angle;

  Particle({
    required this.x,
    required this.y,
    required this.radius,
    required this.speed,
    required this.angle,
  });

  factory Particle.random(Size size) {
    final random = Random();
    return Particle(
      x: random.nextDouble() * size.width,
      y: random.nextDouble() * size.height,
      radius: random.nextDouble() * 2 + 1,
      speed: random.nextDouble() * 0.5 + 0.1,
      angle: random.nextDouble() * 2 * pi,
    );
  }
}
