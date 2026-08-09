import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetStats } from '@workspace/api-client-react';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const colors = useColors();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const styles = StyleSheet.create({
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 28,
      color: colors.primary,
      letterSpacing: -0.5,
    },
    statLabel: {
      fontFamily: 'Inter_400Regular',
      fontSize: 11,
      color: colors.mutedForeground,
      textAlign: 'center',
      marginTop: 2,
    },
  });

  return (
    <Animated.View style={[styles.statItem, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
}

function ServicePill({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.94, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const styles = StyleSheet.create({
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: colors.secondary,
      borderRadius: 100,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pillLabel: {
      fontFamily: 'Inter_500Medium',
      fontSize: 13,
      color: colors.foreground,
    },
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity style={styles.pill} onPress={handlePress} activeOpacity={0.85}>
        <Feather name={icon as any} size={14} color={colors.primary} />
        <Text style={styles.pillLabel}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data: stats, isLoading } = useGetStats();

  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroY = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(heroY, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 + 84 : insets.bottom + 80;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingTop: topPad + 24,
      paddingBottom: bottomPad,
      paddingHorizontal: 20,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(0,220,185,0.1)',
      borderRadius: 100,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: 'rgba(0,220,185,0.2)',
      marginBottom: 20,
    },
    badgeDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.primary,
    },
    badgeText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 12,
      color: colors.primary,
    },
    headline: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 36,
      color: colors.foreground,
      lineHeight: 42,
      letterSpacing: -1,
      marginBottom: 16,
    },
    headlineTeal: {
      color: colors.primary,
    },
    headlineOrange: {
      color: colors.accent,
    },
    subtitle: {
      fontFamily: 'Inter_400Regular',
      fontSize: 15,
      color: colors.mutedForeground,
      lineHeight: 24,
      marginBottom: 28,
    },
    ctaRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 40,
    },
    ctaPrimary: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
    },
    ctaPrimaryText: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 14,
      color: colors.primaryForeground,
    },
    ctaSecondary: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colors.secondary,
      borderRadius: 12,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: colors.border,
    },
    ctaSecondaryText: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 14,
      color: colors.foreground,
    },
    statsCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 32,
    },
    statDivider: {
      width: 1,
      height: 36,
      backgroundColor: colors.border,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 20,
      color: colors.foreground,
      marginBottom: 16,
    },
    pillRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    gradientCard: {
      borderRadius: 16,
      padding: 20,
      marginBottom: 32,
    },
    gradientCardTitle: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 18,
      color: colors.foreground,
      marginBottom: 8,
    },
    gradientCardText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: 'rgba(240,244,255,0.7)',
      lineHeight: 22,
      marginBottom: 16,
    },
    gradientCardBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'flex-start',
    },
    gradientCardBtnText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
      color: colors.primaryForeground,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: heroOpacity, transform: [{ translateY: heroY }] }}>
          {/* Badge */}
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Available for new projects</Text>
          </View>

          {/* Headline */}
          <Text style={styles.headline}>
            We build{' '}
            <Text style={styles.headlineTeal}>digital</Text>
            {'\n'}
            products that{' '}
            <Text style={styles.headlineOrange}>matter</Text>
          </Text>

          <Text style={styles.subtitle}>
            Full-stack agency delivering web, mobile, and AI solutions for ambitious brands.
          </Text>

          {/* CTA buttons */}
          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={styles.ctaPrimary}
              activeOpacity={0.85}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push('/(tabs)/contact');
              }}
            >
              <Text style={styles.ctaPrimaryText}>Get a Quote</Text>
              <Feather name="arrow-right" size={15} color={colors.primaryForeground} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ctaSecondary}
              activeOpacity={0.85}
              onPress={() => router.push('/(tabs)/portfolio')}
            >
              <Text style={styles.ctaSecondaryText}>View Work</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Stats */}
        <View style={styles.statsCard}>
          {isLoading || !stats ? (
            <ActivityIndicator color={colors.primary} style={{ flex: 1 }} />
          ) : (
            <>
              <StatItem value={`${stats.projectsDelivered}+`} label="Projects" delay={200} />
              <View style={styles.statDivider} />
              <StatItem value={`${stats.happyClients}+`} label="Clients" delay={350} />
              <View style={styles.statDivider} />
              <StatItem value={`${stats.avgRating}★`} label="Rating" delay={500} />
              <View style={styles.statDivider} />
              <StatItem value={`${stats.countriesServed}`} label="Countries" delay={650} />
            </>
          )}
        </View>

        {/* What we do */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What we do</Text>
          <View style={styles.pillRow}>
            <ServicePill icon="monitor" label="Web Apps" onPress={() => router.push('/(tabs)/services')} />
            <ServicePill icon="smartphone" label="Mobile" onPress={() => router.push('/(tabs)/services')} />
            <ServicePill icon="cpu" label="AI & ML" onPress={() => router.push('/(tabs)/services')} />
            <ServicePill icon="layers" label="UI/UX Design" onPress={() => router.push('/(tabs)/services')} />
            <ServicePill icon="zap" label="Automation" onPress={() => router.push('/(tabs)/services')} />
            <ServicePill icon="shield" label="DevOps" onPress={() => router.push('/(tabs)/services')} />
          </View>
        </View>

        {/* CTA card */}
        <LinearGradient
          colors={['rgba(0,220,185,0.15)', 'rgba(255,107,53,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientCard, { borderWidth: 1, borderColor: 'rgba(0,220,185,0.15)' }]}
        >
          <Text style={styles.gradientCardTitle}>Ready to launch?</Text>
          <Text style={styles.gradientCardText}>
            Tell us about your project and we'll get back to you within 24 hours.
          </Text>
          <TouchableOpacity
            style={styles.gradientCardBtn}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push('/(tabs)/contact');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.gradientCardBtnText}>Start a conversation</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
