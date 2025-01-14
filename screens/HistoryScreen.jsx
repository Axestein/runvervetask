import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { mockStepData } from '../mockAPI/data';
import { 
  MaterialCommunityIcons, 
  FontAwesome5,
  Ionicons 
} from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const HistoryScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('steps');
  
  const themeStyles = {
    ...(isDarkMode ? darkTheme : lightTheme),
    accentColor: isDarkMode ? '#FF4D4D' : '#7C3AED',
    secondaryAccent: isDarkMode ? '#FF8080' : '#9333EA',
  };

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const metrics = [
    { id: 'steps', label: 'Steps', icon: 'footsteps' },
    { id: 'calories', label: 'Calories', icon: 'flame' },
    { id: 'distance', label: 'Distance', icon: 'map' },
  ];

  const getAchievements = (item) => {
    return {
      dailyGoal: item.steps >= 10000,
      activeMinutes: (item.steps * 0.01) >= 30,
      calorieTarget: (item.steps * 0.04) >= 500,
    };
  };

  const renderTrendChart = () => {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: mockStepData.slice(-7).map(item => 
          selectedMetric === 'steps' ? item.steps :
          selectedMetric === 'calories' ? item.steps * 0.04 :
          item.steps * 0.0008
        ),
        color: (opacity = 1) => themeStyles.accentColor,
        strokeWidth: 2
      }]
    };

    return (
      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, { color: themeStyles.headerTextColor }]}>
          {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trend
        </Text>
        <LineChart
          data={data}
          width={screenWidth - 40}
          height={180}
          chartConfig={{
            backgroundColor: themeStyles.chartBackground,
            backgroundGradientFrom: themeStyles.chartBackground,
            backgroundGradientTo: themeStyles.chartBackground,
            decimalPlaces: selectedMetric === 'distance' ? 2 : 0,
            color: (opacity = 1) => themeStyles.accentColor,
            labelColor: (opacity = 1) => themeStyles.chartTextColor,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: themeStyles.secondaryAccent
            }
          }}
          bezier
          style={styles.chart}
        />
      </View>
    );
  };

  const renderHistoryItem = ({ item }) => {
    const achievements = getAchievements(item);
    
    return (
      <View style={[styles.item, { 
        backgroundColor: themeStyles.itemBackground,
        borderLeftColor: themeStyles.accentColor,
      }]}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={[styles.date, { color: themeStyles.dateTextColor }]}>
              {new Date(item.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
            <Text style={[styles.dateSubtext, { color: themeStyles.statLabelColor }]}>
              {achievements.dailyGoal ? 'Daily Goal Achieved!' : 'Goal In Progress'}
            </Text>
          </View>
          <View style={styles.achievementBadges}>
            {achievements.dailyGoal && (
              <MaterialCommunityIcons 
                name="trophy" 
                size={24} 
                color={themeStyles.accentColor} 
                style={styles.badge}
              />
            )}
            {achievements.activeMinutes && (
              <MaterialCommunityIcons 
                name="timer" 
                size={24} 
                color={themeStyles.accentColor} 
                style={styles.badge}
              />
            )}
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.stat}>
            <View style={[styles.statIcon, { backgroundColor: themeStyles.statIconBackground }]}>
              <FontAwesome5 name="walking" size={20} color={themeStyles.accentColor} />
            </View>
            <Text style={[styles.statValue, { color: themeStyles.statTextColor }]}>
              {item.steps.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: themeStyles.statLabelColor }]}>Steps</Text>
          </View>

          <View style={styles.stat}>
            <View style={[styles.statIcon, { backgroundColor: themeStyles.statIconBackground }]}>
              <Ionicons name="flame" size={20} color={themeStyles.accentColor} />
            </View>
            <Text style={[styles.statValue, { color: themeStyles.statTextColor }]}>
              {(item.steps * 0.04).toFixed(1)}
            </Text>
            <Text style={[styles.statLabel, { color: themeStyles.statLabelColor }]}>Calories</Text>
          </View>

          <View style={styles.stat}>
            <View style={[styles.statIcon, { backgroundColor: themeStyles.statIconBackground }]}>
              <MaterialCommunityIcons name="map-marker-distance" size={20} color={themeStyles.accentColor} />
            </View>
            <Text style={[styles.statValue, { color: themeStyles.statTextColor }]}>
              {(item.steps * 0.0008).toFixed(2)}
            </Text>
            <Text style={[styles.statLabel, { color: themeStyles.statLabelColor }]}>Distance (km)</Text>
          </View>
        </View>

        {achievements.dailyGoal && (
          <LinearGradient
            colors={[themeStyles.accentColor + '20', 'transparent']}
            style={styles.achievementBanner}
          >
            <Text style={[styles.achievementText, { color: themeStyles.accentColor }]}>
              Daily Goal Achieved! 🎉
            </Text>
          </LinearGradient>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <Text style={[styles.header, { color: themeStyles.headerTextColor }]}>Activity History</Text>
      
      <View style={styles.filterContainer}>
        <View style={styles.periodSelection}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && { 
                  backgroundColor: themeStyles.accentColor 
                }
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.selectedPeriodText,
                { color: selectedPeriod === period.id ? '#fff' : themeStyles.statTextColor }
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {renderTrendChart()}

      <FlatList
        data={mockStepData}
        keyExtractor={(item) => item.date}
        renderItem={renderHistoryItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const darkTheme = {
  background: '#000000',
  headerTextColor: '#FF4D4D',
  itemBackground: '#1A1A1A',
  dateTextColor: '#FF4D4D',
  statTextColor: '#FFFFFF',
  statLabelColor: '#A0AEC0',
  chartBackground: '#1A1A1A',
  chartTextColor: '#FFFFFF',
  statIconBackground: '#2D2D2D',
};

const lightTheme = {
  background: '#F8FAFC',
  headerTextColor: '#7C3AED',
  itemBackground: '#FFFFFF',
  dateTextColor: '#7C3AED',
  statTextColor: '#1A1A1A',
  statLabelColor: '#64748B',
  chartBackground: '#FFFFFF',
  chartTextColor: '#1A1A1A',
  statIconBackground: '#F3F4F6',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  periodSelection: {
    flexDirection: 'row',
    backgroundColor: Platform.OS === 'ios' ? '#00000010' : '#00000005',
    borderRadius: 25,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedPeriodText: {
    color: '#FFFFFF',
  },
  chartContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: Platform.OS === 'ios' ? '#00000005' : '#00000002',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 15,
    paddingRight: 40,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateSubtext: {
    fontSize: 14,
    marginTop: 2,
  },
  achievementBadges: {
    flexDirection: 'row',
  },
  badge: {
    marginLeft: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  achievementBanner: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HistoryScreen;