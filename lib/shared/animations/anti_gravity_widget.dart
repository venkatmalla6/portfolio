import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';

class AntiGravityWidget extends StatefulWidget {
  final Widget child;
  final Duration delay;
  final Duration duration;
  final bool enableParallax;

  const AntiGravityWidget({
    super.key,
    required this.child,
    this.delay = Duration.zero,
    this.duration = const Duration(seconds: 3),
    this.enableParallax = true,
  });

  @override
  State<AntiGravityWidget> createState() => _AntiGravityWidgetState();
}

class _AntiGravityWidgetState extends State<AntiGravityWidget> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  double _mouseX = 0.0;
  double _mouseY = 0.0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );

    _animation = Tween<double>(begin: -5.0, end: 5.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine),
    );

    Future.delayed(widget.delay, () {
      if (mounted) {
        _controller.repeat(reverse: true);
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onHover(PointerHoverEvent event, Size size) {
    if (!widget.enableParallax) return;
    final dx = (event.localPosition.dx - size.width / 2) / (size.width / 2);
    final dy = (event.localPosition.dy - size.height / 2) / (size.height / 2);
    setState(() {
      _mouseX = dx * -15.0; // Move away from mouse slightly
      _mouseY = dy * -15.0;
    });
  }

  void _onExit(PointerExitEvent event) {
    setState(() {
      _mouseX = 0.0;
      _mouseY = 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return MouseRegion(
          onHover: (e) => _onHover(e, Size(constraints.maxWidth, constraints.maxHeight)),
          onExit: _onExit,
          child: AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Transform.translate(
                offset: Offset(_mouseX, _animation.value + _mouseY),
                child: child,
              );
            },
            child: widget.child,
          ),
        );
      }
    );
  }
}
