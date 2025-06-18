import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const ParallaxScrollView = ({
  parallaxHeaderContent,
  parallaxHeaderHeight,
  children,
  ...rest
}: {
  parallaxHeaderContent: React.ReactNode;
  parallaxHeaderHeight: number;
  children: React.ReactNode;
}) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-parallaxHeaderHeight, 0, parallaxHeaderHeight],
            [-parallaxHeaderHeight / 2, 0, parallaxHeaderHeight * 0.5]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-parallaxHeaderHeight, 0, parallaxHeaderHeight],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} {...rest}>
      <Animated.View style={[imageAnimatedStyle]}>
        {parallaxHeaderContent}
      </Animated.View>
      {children}
    </Animated.ScrollView>
  );
};

export default ParallaxScrollView;
