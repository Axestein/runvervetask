import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { mockStepData } from '../mockAPI/data';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { ThemeContext } from '../ThemeContext';
import { BlurView } from 'expo-blur';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [fadeAnim] = useState(new Animated.Value(0));
  const userName = "Aditya"; 
  
  //new health metrics- raw data 
  const [healthMetrics, setHealthMetrics] = useState({
    steps: { current: 0, goal: 10000 },
    water: { current: 0, goal: 3000 }, 
    calories: { burned: 0, consumed: 0, goal: 2500 },
    sleep: { current: 0, goal: 8 },
    heart: { current: 0, min: 60, max: 100 },
    stress: { level: 'Low', score: 85 },
    mindfulness: { minutes: 0, goal: 20 },
    bloodOxygen: { level: 98, min: 95 },
    healthScore: 92, 
  });

  // for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const loadHealthData = async () => {
      const todayData = mockStepData[mockStepData.length - 1];
      
      setHealthMetrics(prev => ({
        ...prev,
        steps: { ...prev.steps, current: todayData.steps },
        calories: { 
          ...prev.calories,
          burned: Math.round(todayData.steps * 0.04),
          consumed: 1800
        },
        water: { ...prev.water, current: 2100 },
        sleep: { ...prev.sleep, current: 7.5 },
        heart: { ...prev.heart, current: 75 },
        mindfulness: { ...prev.mindfulness, minutes: 15 },
      }));
    };

    loadHealthData();
  }, []);

  const renderWelcomeSection = () => (
    <Animated.View style={[styles.welcomeCard, { opacity: fadeAnim }]}>
      <BlurView intensity={100} style={styles.blurContainer}>
        <View style={styles.welcomeContent}>
          <Text style={[styles.greeting, { color: themeStyles.primaryTextColor }]}>{getGreeting()}, {userName}</Text>
          <Text style={[styles.welcomeSubtext, { color: themeStyles.secondaryTextColor }]}>Your wellness journey continues</Text>
          <View style={styles.highlightMetrics}>
            <View style={styles.highlightItem}>
              <Ionicons name="trending-up" size={24} color={themeStyles.accentColor} />
              <Text style={[styles.highlightText, { color: themeStyles.primaryTextColor }]}>
                {((healthMetrics.steps.current / healthMetrics.steps.goal) * 100).toFixed(1)}% of daily goal
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );

  const renderHealthScore = () => (
    <View style={[styles.card, { backgroundColor: themeStyles.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: themeStyles.cardTitleColor }]}>
        <FontAwesome5 name="heartbeat" size={24} color={themeStyles.iconColor} /> Health Score
      </Text>
      <View style={styles.healthScoreContainer}>
        <View style={[styles.scoreRing, { borderColor: themeStyles.accentColor }]}>
          <Text style={[styles.scoreText, { color: themeStyles.accentColor }]}>
            {healthMetrics.healthScore}
          </Text>
          <Text style={[styles.scoreLabel, { color: themeStyles.secondaryTextColor }]}>
            Excellent
          </Text>
        </View>
        <View style={styles.healthMetrics}>
          <View style={styles.healthMetric}>
            <Ionicons name="fitness" size={20} color={themeStyles.iconColor} />
            <Text style={[styles.metricText, { color: themeStyles.primaryTextColor }]}>
              Activity Score: 88%
            </Text>
          </View>
          <View style={styles.healthMetric}>
            <Ionicons name="restaurant" size={20} color={themeStyles.iconColor} />
            <Text style={[styles.metricText, { color: themeStyles.primaryTextColor }]}>
              Nutrition Score: 95%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMindfulnessSection = () => (
    <View style={[styles.card, { backgroundColor: themeStyles.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: themeStyles.cardTitleColor }]}>
        <MaterialCommunityIcons name="meditation" size={24} color={themeStyles.iconColor} /> Mindfulness
      </Text>
      <View style={styles.mindfulnessContainer}>
        <View style={styles.mindfulnessProgress}>
          <Text style={[styles.mindfulnessTime, { color: themeStyles.primaryTextColor }]}>
            {healthMetrics.mindfulness.minutes} min
          </Text>
          <Text style={[styles.mindfulnessGoal, { color: themeStyles.secondaryTextColor }]}>
            of {healthMetrics.mindfulness.goal} min goal
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: themeStyles.accentColor }]}
          onPress={() => navigation.navigate('Meditation')}
        >
          <Text style={styles.startButtonText}>Start Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVitalSigns = () => (
    <View style={[styles.card, { backgroundColor: themeStyles.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: themeStyles.cardTitleColor }]}>
        <FontAwesome5 name="lungs" size={24} color={themeStyles.iconColor} /> Vital Signs
      </Text>
      <View style={styles.vitalsContainer}>
        <View style={styles.vitalMetric}>
          <Text style={[styles.vitalValue, { color: themeStyles.primaryTextColor }]}>
            {healthMetrics.bloodOxygen.level}%
          </Text>
          <Text style={[styles.vitalLabel, { color: themeStyles.secondaryTextColor }]}>Blood Oxygen</Text>
        </View>
        <View style={styles.vitalMetric}>
          <Text style={[styles.vitalValue, { color: themeStyles.primaryTextColor }]}>
            {healthMetrics.stress.score}
          </Text>
          <Text style={[styles.vitalLabel, { color: themeStyles.secondaryTextColor }]}>Stress Level</Text>
        </View>
      </View>
    </View>
  );

  const themeStyles = {
    ...(isDarkMode ? darkTheme : lightTheme),
    accentColor: isDarkMode ? '#FF4D4D' : '#3E64FF',  
    primaryTextColor: isDarkMode ? '#FFFFFF' : '#2D3748',
    secondaryTextColor: isDarkMode ? '#A0AEC0' : '#718096',
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: themeStyles.background }]} 
      contentContainerStyle={styles.scrollContent}
    >
      {renderWelcomeSection()}
      {renderHealthScore()}
      {renderMindfulnessSection()}
      {renderVitalSigns()}

      
      <View style={[styles.card, { backgroundColor: themeStyles.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: themeStyles.cardTitleColor }]}>
          Sleep Tracking (Hours)
        </Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              data: [7, 6.5, 8, 7.5, 6, 8, 7],
              color: () => themeStyles.accentColor,
              strokeWidth: 2,
            }],
          }}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: themeStyles.chartBackground,
            backgroundGradientFrom: themeStyles.chartBackground,
            backgroundGradientTo: themeStyles.chartBackground,
            color: () => themeStyles.chartLineColor,
            labelColor: () => themeStyles.chartLabelColor,
          }}
          bezier
          style={{ marginVertical: 10, borderRadius: 8 }}
        />
      </View>

      <View style={[styles.card, { backgroundColor: themeStyles.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: themeStyles.cardTitleColor }]}>
          Stress Level
        </Text>
        <PieChart
          data={[
            { name: 'Low', population: 40, color: '#5D5FEF', legendFontColor: '#fff', legendFontSize: 12 },
            { name: 'Medium', population: 35, color: '#FBBF24', legendFontColor: '#fff', legendFontSize: 12 },
            { name: 'High', population: 25, color: '#EF4444', legendFontColor: '#fff', legendFontSize: 12 },
          ]}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: themeStyles.chartBackground,
            backgroundGradientFrom: themeStyles.chartBackground,
            backgroundGradientTo: themeStyles.chartBackground,
            color: () => themeStyles.chartLineColor,
            labelColor: () => themeStyles.chartLabelColor,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

    </ScrollView>
  );
};

const darkTheme = {
  background: '#0A0A0A',
  cardBackground: '#1A1A1A',
  cardTitleColor: '#ff4d4d',
  iconColor: '#ff4d4d',
  progressBarColor: '#ff4d4d',
  chartBackground: '#1A1A1A',
  chartLineColor: '#ff4d4d',
  chartLabelColor: '#FFFFFF',
};

const lightTheme = {
  background: '#F7FAFC',
  cardBackground: '#FFFFFF',
  cardTitleColor: '#3E64FF',
  iconColor: '#3E64FF',
  progressBarColor: '#3E64FF',
  chartBackground: '#FFFFFF',
  chartLineColor: '#3E64FF',
  chartLabelColor: '#2D3748',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeCard: {
    height: 180,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  blurContainer: {
    flex: 1,
    padding: 20,
  },
  welcomeContent: {
    flex: 1,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    marginBottom: 20,
  },
  highlightMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    fontSize: 16,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#FF4D4D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 14,
  },
  healthMetrics: {
    flex: 1,
    marginLeft: 20,
  },
  healthMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  metricText: {
    fontSize: 16,
  },
  mindfulnessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mindfulnessProgress: {
    flex: 1,
  },
  mindfulnessTime: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mindfulnessGoal: {
    fontSize: 14,
  },
  startButton: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  vitalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  vitalMetric: {
    alignItems: 'center',
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  vitalLabel: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default HomeScreen;
