import 'dart:ui';
import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';

class GlassPanel extends StatelessWidget {
  final Widget child;
  final double padding;
  final double blur;
  final double opacity;

  const GlassPanel({
    Key? key,
    required this.child,
    this.padding = 24.0,
    this.blur = 10.0,
    this.opacity = 0.1,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16.0),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          padding: EdgeInsets.all(padding),
          decoration: AppTheme.glassDecoration(
            opacity: opacity,
            blur: blur,
          ),
          child: child,
        ),
      ),
    );
  }
}
