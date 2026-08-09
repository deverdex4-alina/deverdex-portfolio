import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSubmitQuote } from '@workspace/api-client-react';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { useColors } from '@/hooks/useColors';

const SERVICES = [
  'Web App Development',
  'Mobile App Development',
  'AI / ML Integration',
  'UI/UX Design',
  'DevOps & Infrastructure',
  'Automation',
  'Other',
];

const BUDGETS = [
  'Under $5k',
  '$5k – $15k',
  '$15k – $50k',
  '$50k – $100k',
  '$100k+',
];

function FieldLabel({ text }: { text: string }) {
  const colors = useColors();
  return (
    <Text style={{
      fontFamily: 'Inter_600SemiBold',
      fontSize: 12,
      color: colors.mutedForeground,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
      marginBottom: 8,
    }}>
      {text}
    </Text>
  );
}

function StyledInput({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
}: {
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  error?: boolean;
}) {
  const colors = useColors();
  const [focused, setFocused] = useState(false);

  const s = StyleSheet.create({
    input: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: error ? colors.destructive : focused ? colors.primary : colors.border,
      paddingHorizontal: 14,
      paddingVertical: multiline ? 12 : 0,
      height: multiline ? 100 : 48,
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.foreground,
      textAlignVertical: multiline ? 'top' : 'center',
    },
  });

  return (
    <TextInput
      style={s.input}
      placeholder={placeholder}
      placeholderTextColor={colors.mutedForeground}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function SelectChips({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  const colors = useColors();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt) => {
        const isActive = selected === opt;
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => {
              Haptics.selectionAsync();
              onSelect(opt);
            }}
            style={{
              borderRadius: 100,
              paddingHorizontal: 14,
              paddingVertical: 8,
              backgroundColor: isActive ? colors.primary : colors.secondary,
              borderWidth: 1,
              borderColor: isActive ? colors.primary : colors.border,
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              fontFamily: 'Inter_500Medium',
              fontSize: 13,
              color: isActive ? colors.primaryForeground : colors.foreground,
            }}>
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ContactScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { mutateAsync: submitQuote, isPending } = useSubmitQuote();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 + 84 : insets.bottom + 80;

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!name.trim()) e.name = true;
    if (!email.trim() || !email.includes('@')) e.email = true;
    if (!service) e.service = true;
    if (!message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await submitQuote({
        data: {
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          service,
          budget: budget || undefined,
          message: message.trim(),
        },
      });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setSubmitted(true);
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const reset = () => {
    setName(''); setEmail(''); setCompany(''); setService('');
    setBudget(''); setMessage(''); setErrors({}); setSubmitted(false);
  };

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
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: bottomPad,
      gap: 20,
    },
    field: { gap: 8 },
    errorHint: {
      fontFamily: 'Inter_400Regular',
      fontSize: 11,
      color: colors.destructive,
    },
    submitBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 14,
      paddingVertical: 16,
      marginTop: 4,
    },
    submitBtnText: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 16,
      color: colors.primaryForeground,
    },
    successCard: {
      margin: 20,
      marginTop: topPad + 20,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 28,
      borderWidth: 1,
      borderColor: 'rgba(0,220,185,0.2)',
      alignItems: 'center',
      gap: 16,
    },
    successIconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: 'rgba(0,220,185,0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    successTitle: {
      fontFamily: 'SpaceGrotesk_700Bold',
      fontSize: 22,
      color: colors.foreground,
      textAlign: 'center',
    },
    successText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: 'center',
      lineHeight: 22,
    },
    resetBtn: {
      marginTop: 4,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 12,
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.border,
    },
    resetBtnText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
      color: colors.foreground,
    },
  });

  if (submitted) {
    return (
      <View style={s.container}>
        <View style={s.successCard}>
          <View style={s.successIconCircle}>
            <Feather name="check" size={32} color={colors.primary} />
          </View>
          <Text style={s.successTitle}>Request Sent!</Text>
          <Text style={s.successText}>
            Thank you, {name.split(' ')[0]}! We'll review your project and get back to you within 24 hours.
          </Text>
          <TouchableOpacity style={s.resetBtn} onPress={reset} activeOpacity={0.8}>
            <Text style={s.resetBtnText}>Submit another request</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>Get a Quote</Text>
        <Text style={s.subtitle}>Tell us about your project</Text>
      </View>

      <KeyboardAwareScrollViewCompat
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
      >
        <View style={s.field}>
          <FieldLabel text="Your Name *" />
          <StyledInput
            placeholder="Jane Smith"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={errors.name}
          />
          {errors.name && <Text style={s.errorHint}>Name is required</Text>}
        </View>

        <View style={s.field}>
          <FieldLabel text="Email *" />
          <StyledInput
            placeholder="jane@company.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          {errors.email && <Text style={s.errorHint}>Valid email is required</Text>}
        </View>

        <View style={s.field}>
          <FieldLabel text="Company" />
          <StyledInput
            placeholder="Acme Corp (optional)"
            value={company}
            onChangeText={setCompany}
            autoCapitalize="words"
          />
        </View>

        <View style={s.field}>
          <FieldLabel text="Service Needed *" />
          <SelectChips options={SERVICES} selected={service} onSelect={setService} />
          {errors.service && <Text style={s.errorHint}>Please select a service</Text>}
        </View>

        <View style={s.field}>
          <FieldLabel text="Budget Range" />
          <SelectChips options={BUDGETS} selected={budget} onSelect={setBudget} />
        </View>

        <View style={s.field}>
          <FieldLabel text="Project Details *" />
          <StyledInput
            placeholder="Describe your project, goals, timeline..."
            value={message}
            onChangeText={setMessage}
            multiline
            error={errors.message}
          />
          {errors.message && <Text style={s.errorHint}>Project details are required</Text>}
        </View>

        <TouchableOpacity
          style={[s.submitBtn, isPending && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={isPending}
          activeOpacity={0.85}
        >
          {isPending ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <>
              <Text style={s.submitBtnText}>Send Request</Text>
              <Feather name="send" size={16} color={colors.primaryForeground} />
            </>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}
