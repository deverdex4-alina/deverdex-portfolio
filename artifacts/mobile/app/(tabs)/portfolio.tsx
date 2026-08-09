import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetProjects } from '@workspace/api-client-react';
import type { Project } from '@workspace/api-client-react';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const CATEGORIES = ['All', 'Web', 'Mobile', 'AI', 'Design'];

const CATEGORY_COLORS: Record<string, string> = {
  web: '#00DCB9',
  mobile: '#FF6B35',
  ai: '#818CF8',
  design: '#F472B6',
  other: '#6B7FA8',
};

function getCategoryColor(cat: string): string {
  const key = cat?.toLowerCase();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.other;
}

function TagChip({ tag }: { tag: string }) {
  const colors = useColors();
  const s = StyleSheet.create({
    chip: {
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderRadius: 100,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    text: {
      fontFamily: 'Inter_400Regular',
      fontSize: 11,
      color: colors.mutedForeground,
    },
  });
  return (
    <View style={s.chip}>
      <Text style={s.text}>{tag}</Text>
    </View>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const colors = useColors();
  const catColor = getCategoryColor(project.category);

  const s = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
      overflow: 'hidden',
    },
    colorBar: {
      height: 3,
      backgroundColor: catColor,
    },
    body: {
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    titleArea: { flex: 1, marginRight: 10 },
    title: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 16,
      color: colors.foreground,
      lineHeight: 22,
    },
    featuredBadge: {
      backgroundColor: 'rgba(0,220,185,0.1)',
      borderRadius: 100,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderWidth: 1,
      borderColor: 'rgba(0,220,185,0.2)',
    },
    featuredText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 10,
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
    },
    catBadge: {
      borderRadius: 100,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    catText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 11,
    },
    platform: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      color: colors.mutedForeground,
    },
    description: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      color: colors.mutedForeground,
      lineHeight: 20,
      marginBottom: 12,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    liveBtn: {
      marginTop: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'flex-start',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: 'rgba(0,220,185,0.08)',
      borderWidth: 1,
      borderColor: 'rgba(0,220,185,0.15)',
    },
    liveBtnText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 12,
      color: colors.primary,
    },
  });

  return (
    <View style={s.card}>
      <View style={s.colorBar} />
      <View style={s.body}>
        <View style={s.row}>
          <View style={s.titleArea}>
            <Text style={s.title}>{project.title}</Text>
          </View>
          {project.featured && (
            <View style={s.featuredBadge}>
              <Text style={s.featuredText}>Featured</Text>
            </View>
          )}
        </View>

        <View style={s.metaRow}>
          <View style={[s.catBadge, { backgroundColor: `${catColor}18` }]}>
            <Text style={[s.catText, { color: catColor }]}>{project.category}</Text>
          </View>
          <Feather name="monitor" size={12} color={colors.mutedForeground} />
          <Text style={s.platform}>{project.platform}</Text>
        </View>

        <Text style={s.description} numberOfLines={3}>
          {project.description}
        </Text>

        {project.tags?.length > 0 && (
          <View style={s.tagsRow}>
            {project.tags.slice(0, 4).map((tag, i) => (
              <TagChip key={i} tag={tag} />
            ))}
            {project.tags.length > 4 && (
              <TagChip tag={`+${project.tags.length - 4}`} />
            )}
          </View>
        )}

        {project.liveUrl && (
          <TouchableOpacity
            style={s.liveBtn}
            activeOpacity={0.8}
            onPress={() => {
              if (project.liveUrl) Linking.openURL(project.liveUrl);
            }}
          >
            <Feather name="external-link" size={12} color={colors.primary} />
            <Text style={s.liveBtnText}>View Live</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function PortfolioScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: projects, isLoading, isError, refetch } = useGetProjects();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 + 84 : insets.bottom + 80;

  const filtered = projects?.filter((p) =>
    activeCategory === 'All'
      ? true
      : p.category?.toLowerCase() === activeCategory.toLowerCase()
  ) ?? [];

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      paddingTop: topPad + 20,
      paddingHorizontal: 20,
      paddingBottom: 4,
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
      marginBottom: 16,
    },
    filterScroll: {
      paddingHorizontal: 20,
      paddingBottom: 14,
      flexGrow: 0,
    },
    filterRow: {
      flexDirection: 'row',
      gap: 8,
    },
    filterChip: {
      borderRadius: 100,
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderWidth: 1,
    },
    filterChipText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 13,
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
      textAlign: 'center',
    },
  });

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Portfolio</Text>
        <Text style={s.subtitle}>
          {projects?.length ?? 0} projects delivered
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.filterRow}
        style={{ flexGrow: 0, paddingHorizontal: 20, marginBottom: 14 }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                s.filterChip,
                {
                  backgroundColor: isActive ? colors.primary : colors.secondary,
                  borderColor: isActive ? colors.primary : colors.border,
                },
              ]}
              onPress={() => {
                Haptics.selectionAsync();
                setActiveCategory(cat);
              }}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  s.filterChipText,
                  { color: isActive ? colors.primaryForeground : colors.foreground },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {isLoading ? (
        <View style={s.centered}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : isError ? (
        <View style={s.centered}>
          <Feather name="alert-circle" size={32} color={colors.mutedForeground} />
          <Text style={s.errorText}>Couldn't load projects</Text>
          <TouchableOpacity style={s.retryBtn} onPress={() => refetch()}>
            <Text style={s.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <ProjectCard project={item} />}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!!filtered.length}
          ListEmptyComponent={
            <View style={[s.centered, { paddingTop: 48 }]}>
              <Feather name="folder" size={32} color={colors.mutedForeground} />
              <Text style={s.emptyText}>
                {activeCategory === 'All'
                  ? 'No projects yet'
                  : `No ${activeCategory} projects`}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
