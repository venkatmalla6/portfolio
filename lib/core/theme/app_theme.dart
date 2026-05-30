import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Color Palette
  static const Color primary = Color(0xFF0066FF);
  static const Color secondary = Color(0xFF00D4FF);
  static const Color background = Color(0xFF050816);
  static const Color accent = Color(0xFF64FFDA);

  // Text Theme using Rajdhani (Futuristic)
  static TextTheme get textTheme {
    return GoogleFonts.rajdhaniTextTheme().apply(
      bodyColor: Colors.white,
      displayColor: Colors.white,
    );
  }

  // ThemeData
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: primary,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: secondary,
        surface: background,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: Colors.white,
      ),
      textTheme: textTheme,
      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        titleTextStyle: GoogleFonts.orbitron(
          color: accent,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  // Glassmorphism utility
  static BoxDecoration glassDecoration({
    double opacity = 0.1,
    double blur = 10.0,
    double borderRadius = 16.0,
    Color borderColor = accent,
    double borderWidth = 1.0,
  }) {
    return BoxDecoration(
      color: Colors.white.withOpacity(opacity),
      borderRadius: BorderRadius.circular(borderRadius),
      border: Border.all(
        color: borderColor.withOpacity(0.3),
        width: borderWidth,
      ),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.2),
          blurRadius: blur,
          spreadRadius: 1,
        ),
      ],
    );
  }
}
