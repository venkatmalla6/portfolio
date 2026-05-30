import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../shared/widgets/glass_panel.dart';
import '../../../../shared/animations/anti_gravity_widget.dart';
import '../../../../core/theme/app_theme.dart';

class DevOpsPipelineSection extends StatefulWidget {
  const DevOpsPipelineSection({super.key});

  @override
  State<DevOpsPipelineSection> createState() => _DevOpsPipelineSectionState();
}

class _DevOpsPipelineSectionState extends State<DevOpsPipelineSection> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  final List<_PipelineStage> _stages = [
    _PipelineStage('Developer', Icons.code),
    _PipelineStage('GitHub', Icons.source),
    _PipelineStage('Jenkins', Icons.build),
    _PipelineStage('Docker', Icons.view_in_ar),
    _PipelineStage('Testing', Icons.bug_report),
    _PipelineStage('Deployment', Icons.rocket_launch),
    _PipelineStage('AWS EC2', Icons.memory),
  ];

  @override
  void initState() {
    super.initState();
    // Animation cycles through the pipeline stages continuously
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 14), // 2 seconds per stage
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.sync, color: AppTheme.primary, size: 32),
              const SizedBox(width: 16),
              Text(
                'LIVE DEVOPS PIPELINE',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
              ).animate().fade().slideX(),
            ],
          ),
          const SizedBox(height: 32),
          AntiGravityWidget(
            duration: const Duration(seconds: 7),
            child: GlassPanel(
              padding: 32.0,
              child: AnimatedBuilder(
                animation: _controller,
                builder: (context, child) {
                  final progress = _controller.value;
                  // Calculate which step is currently "running" based on progress (0.0 to 1.0)
                  final currentStepIndex = (progress * _stages.length).floor();
                  
                  return LayoutBuilder(
                    builder: (context, constraints) {
                      final isDesktop = constraints.maxWidth > 800;
                      if (isDesktop) {
                        return _buildHorizontalPipeline(currentStepIndex);
                      } else {
                        return _buildVerticalPipeline(currentStepIndex);
                      }
                    },
                  );
                },
              ),
            ),
          ).animate().fade(duration: 1.seconds).scale(begin: const Offset(0.95, 0.95)),
        ],
      ),
    );
  }

  Widget _buildHorizontalPipeline(int currentStepIndex) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: List.generate(_stages.length * 2 - 1, (index) {
        if (index.isEven) {
          final stageIndex = index ~/ 2;
          return _buildStageNode(stageIndex, currentStepIndex);
        } else {
          final stageIndex = index ~/ 2;
          return Expanded(child: _buildConnector(stageIndex, currentStepIndex, true));
        }
      }),
    );
  }

  Widget _buildVerticalPipeline(int currentStepIndex) {
    return Column(
      children: List.generate(_stages.length * 2 - 1, (index) {
        if (index.isEven) {
          final stageIndex = index ~/ 2;
          return _buildStageNode(stageIndex, currentStepIndex);
        } else {
          final stageIndex = index ~/ 2;
          return _buildConnector(stageIndex, currentStepIndex, false);
        }
      }),
    );
  }

  Widget _buildStageNode(int stageIndex, int currentStepIndex) {
    final isCompleted = stageIndex < currentStepIndex;
    final isRunning = stageIndex == currentStepIndex;
    final isPending = stageIndex > currentStepIndex;

    Color statusColor;
    if (isCompleted) {
      statusColor = Colors.greenAccent;
    } else if (isRunning) {
      statusColor = AppTheme.secondary;
    } else {
      statusColor = Colors.grey.shade700;
    }

    return Container(
      width: 100,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Status light
          Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: statusColor,
              boxShadow: isRunning
                  ? [BoxShadow(color: statusColor, blurRadius: 10, spreadRadius: 2)]
                  : [],
            ),
          ).animate(target: isRunning ? 1 : 0).shimmer(duration: 500.ms),
          const SizedBox(height: 16),
          // Node Icon
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: AppTheme.background.withValues(alpha: 0.8),
              border: Border.all(
                color: isRunning ? AppTheme.accent : (isCompleted ? Colors.greenAccent.withValues(alpha: 0.5) : Colors.grey.withValues(alpha: 0.3)),
                width: isRunning ? 2 : 1,
              ),
              boxShadow: isRunning
                  ? [BoxShadow(color: AppTheme.accent.withValues(alpha: 0.3), blurRadius: 15)]
                  : [],
            ),
            child: Icon(
              _stages[stageIndex].icon,
              color: isRunning ? AppTheme.accent : (isCompleted ? Colors.white : Colors.grey),
              size: 28,
            ),
          ),
          const SizedBox(height: 12),
          // Label
          Text(
            _stages[stageIndex].name,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 12,
              fontWeight: isRunning ? FontWeight.bold : FontWeight.normal,
              color: isRunning ? AppTheme.accent : (isCompleted ? Colors.white : Colors.grey),
            ),
          ),
          const SizedBox(height: 4),
          // Status Text
          Text(
            isRunning ? 'RUNNING...' : (isCompleted ? 'SUCCESS' : 'PENDING'),
            style: TextStyle(
              fontSize: 9,
              color: statusColor,
              letterSpacing: 1,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildConnector(int stageIndex, int currentStepIndex, bool isHorizontal) {
    final isCompleted = stageIndex < currentStepIndex;
    final isRunning = stageIndex == currentStepIndex;

    return Container(
      width: isHorizontal ? null : 2,
      height: isHorizontal ? 2 : 40,
      margin: isHorizontal ? const EdgeInsets.symmetric(horizontal: 8, vertical: 36) : const EdgeInsets.symmetric(vertical: 8),
      color: isCompleted ? Colors.greenAccent.withValues(alpha: 0.5) : Colors.grey.withValues(alpha: 0.3),
      child: isRunning
          ? (isHorizontal
              ? Align(
                  alignment: Alignment.centerLeft,
                  child: Container(
                    width: 20,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppTheme.secondary,
                      boxShadow: [BoxShadow(color: AppTheme.secondary, blurRadius: 10)],
                    ),
                  ).animate(onPlay: (c) => c.repeat()).moveX(begin: 0, end: 50, duration: 2.seconds),
                )
              : Align(
                  alignment: Alignment.topCenter,
                  child: Container(
                    width: 4,
                    height: 20,
                    decoration: BoxDecoration(
                      color: AppTheme.secondary,
                      boxShadow: [BoxShadow(color: AppTheme.secondary, blurRadius: 10)],
                    ),
                  ).animate(onPlay: (c) => c.repeat()).moveY(begin: 0, end: 20, duration: 2.seconds),
                ))
          : null,
    );
  }
}

class _PipelineStage {
  final String name;
  final IconData icon;

  _PipelineStage(this.name, this.icon);
}
