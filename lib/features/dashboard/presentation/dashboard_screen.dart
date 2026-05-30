import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../shared/animations/anti_gravity_widget.dart';
import '../../../shared/widgets/glass_panel.dart';
import '../../../shared/widgets/particle_background.dart';
import '../../../core/theme/app_theme.dart';
import 'widgets/profile_panel.dart';

import 'widgets/hero_section.dart';
import 'widgets/recruiter_dashboard_section.dart';
import 'widgets/about_me_section.dart';
import 'widgets/aws_architecture_section.dart';
import 'widgets/devops_pipeline_section.dart';
import 'widgets/futuristic_timeline_section.dart';
import 'widgets/network_topology_section.dart';
import 'widgets/communication_center_section.dart';
import '../../skills/presentation/skills_dashboard.dart';
import '../../projects/presentation/projects_showcase_section.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width > 800;

    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.background, Color(0xFF0A0F2C)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Stack(
            children: [
              // Global particle background
              Positioned.fill(
                child: ParticleBackground(),
              ),
              SingleChildScrollView(
                child: Column(
                  children: [
                const HeroSection(),
                const RecruiterDashboardSection(),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 24.0),
                  child: AboutMeSection(),
                ),
                const SkillsDashboard(),
                const AwsArchitectureSection(),
                const DevOpsPipelineSection(),
                const FuturisticTimelineSection(),
                const NetworkTopologySection(),
                const ProjectsShowcaseSection(),
                const CommunicationCenterSection(),
              ],
            ),
          ),
        ],
      ),
    ),
  ),
);
  }
}
