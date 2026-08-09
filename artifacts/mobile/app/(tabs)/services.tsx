import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetServices } from '@workspace/api-client-react';
import type { Service } from '@workspace/api-client-react';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useRouter } from 'expo-router';

const ICON_MAP: Record<string, string> = {
  web: 'monitor',
  mobile: 'smartphone',
  ai: 'cpu',
  design: 'layers',
  automation: 'zap',
  devops: 'server',
  default: 'code',
};

function getIcon(iconSlug: string): string {
  const key = iconSlug?.toLowerCase?.() ?? '';
  for (const [k, v] of Object.entries(ICON_MAP)) {
    if (key.includes(k)) return v;
  }
  return ICON_MAP.default;
}

function PackageRow({ pkg }: { pkg: { name: string; price: string; delivery: string } }) {
  const colors = useColors();
  const s = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    name: {
      fontFamily: 'Inter_500Medium',
      fontSize: 13,
      color: colors.foreground,
      flex: 1,
    },
    delivery: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      color: colors.mutedForeground,
      marginRight: 12,
    },
    price: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 14,
      color: colors.primary,
    },
  });
  return (
    <View style={s.row}>
      <Text style={s.name}>{pkg.name}</Text>
      <Text style={s.delivery}>{pkg.delivery}</Text>
      <Text style={s.price}>{pkg.price}</Text>
    </View>
  );
}

function ServiceCard({ service, onPress }: { service: Service; onPress: () => void }) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);
  const iconName = getIcon(service.icon ?? service.slug);

  const toggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpanded((v) => !v);
  };

  const s = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap: 14,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: 'rgba(0,220,185,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleArea: {
      flex: 1,
    },
    name: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 16,
      color: colors.foreground,
    },
    category: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 2,
    },
    chevron: {
      marginLeft: 'auto',
    },
    body: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    description: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      color: colors.mutedForeground,
      lineHeight: 20,
      marginBottom: 14,
    },
    featuresTitle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 12,
      color: colors.foreground,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
    },
    featureText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      color: colors.mutedForeground,
      flex: 1,
    },
    packagesTitle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 12,
      color: colors.foreground,
      marginTop: 14,
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    quoteBtn: {
      marginTop: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 12,
    },
    quoteBtnText: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 13,
      color: colors.primaryForeground,
    },
  });

  return (
    <View style={s.card}>
      <Pressable style={s.header} onPress={toggle}>
        <View style={s.iconBox}>
          <Feather name={iconName as any} size={20} color={colors.primary} />
        </View>
        <View style={s.titleArea}>
          <Text style={s.name}>{service.name}</Text>
          <Text style={s.category}>{service.category}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={colors.mutedForeground}
          style={s.chevron}
        />
      </Pressable>

      {expanded && (
        <View style={s.body}>
          <Text style={s.description}>{service.description}</Text>

          {service.features?.length > 0 && (
            <>
              <Text style={s.featuresTitle}>Features</Text>
              {service.features.map((f, i) => (
                <View key={i} style={s.featureRow}>
                  <Feather name="check-circle" size={13} color={colors.primary} />
                  <Text style={s.featureText}>{f}</Text>
                </View>
              ))}
            </>
          )}

          {service.packages?.length > 0 && (
            <>
              <Text style={s.packagesTitle}>Packages</Text>
              {service.packages.map((pkg, i) => (
                <PackageRow key={i} pkg={pkg} />
              ))}
            </>
          )}

          <TouchableOpacity style={s.quoteBtn} onPress={onPress} activeOpacity={0.85}>
            <Text style={s.quoteBtnText}>Request a Quote</Text>
            <Feather name="arrow-right" size={14} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function ServicesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { data: services, isLoading, isError, refetch } = useGetServices();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 + 84 : insets.bottom + 80;

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topPad + 20,
      paddingHorizontal: 20,
      paddingBottom: 16,
    },
    title: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 28,
      color: colors.foreground,
      letterSpacing: -0.5,
    },
    subtitle: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 6,
    },
    list: { paddingHorizontal: 20, paddingBottom: bottomPad },
    centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
    errorText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: 'center',
    },
    retryBtn: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    retryText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
      color: colors.primaryForeground,
    },
    emptyText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
    },
  });

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Services</Text>
        <Text style={s.subtitle}>Tap a card to explore details & pricing</Text>
      </View>

      {isLoading ? (
        <View style={s.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : isError ? (
        <View style={s.centered}>
          <Feather name="alert-circle" size={32} color={colors.mutedForeground} />
          <Text style={s.errorText}>Couldn't load services</Text>
          <TouchableOpacity style={s.retryBtn} onPress={() => refetch()}>
            <Text style={s.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={services ?? []}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ServiceCard
              service={item}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                router.push('/(tabs)/contact');
              }}
            />
          )}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={s.centered}>
              <Feather name="layers" size={32} color={colors.mutedForeground} />
              <Text style={s.emptyText}>No services found</Text>
            </View>
          }
          scrollEnabled={!!(services && services.length > 0)}
        />
      )}
    </View>
  );
}
