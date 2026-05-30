import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../core/theme/app_theme.dart';

class ProfilePanel extends StatelessWidget {
  const ProfilePanel({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GlassPanel(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: AppTheme.accent, width: 2),
                  image: const DecorationImage(
                    image: NetworkImage('https://via.placeholder.com/150'), // Replace with actual avatar
                    fit: BoxFit.cover,
                  ),
                ),
              ).animate().scale(duration: 500.ms, curve: Curves.easeOutBack),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'SOFTWARE ENGINEER',
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: AppTheme.accent,
                            letterSpacing: 2.0,
                          ),
                    ).animate().fade(delay: 200.ms),
                    Text(
                      'VENKAT',
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                    ).animate().fade(delay: 400.ms).slideX(),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Text(
            'MISSION OBJECTIVE:',
            style: TextStyle(color: AppTheme.secondary, fontSize: 12, letterSpacing: 1.5),
          ),
          const SizedBox(height: 8),
          Text(
            'Architecting scalable cloud infrastructure and developing high-performance Flutter applications.',
            style: TextStyle(color: Colors.white70, height: 1.5),
          ).animate().fade(delay: 600.ms),
          const SizedBox(height: 24),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primary.withOpacity(0.2),
              side: const BorderSide(color: AppTheme.primary),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
              padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.terminal, color: AppTheme.secondary),
                SizedBox(width: 8),
                Text('INITIATE CONTACT', style: TextStyle(color: AppTheme.secondary)),
              ],
            ),
          ).animate(onPlay: (c) => c.repeat(reverse: true)).shimmer(duration: 2.seconds),
        ],
      ),
    );
  }
}
