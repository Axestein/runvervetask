import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Line } from 'recharts';
import { Activity, Heart, Flame } from 'lucide-react';
import { TouchableOpacity, Text, View } from 'react-native'; 
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'; 

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const todayStats = {
    steps: 8432,
    calories: 320,
    heart: 75,
    goal: 10000,
  };

  const activityData = [
    { day: 'Mon', steps: 8432, calories: 320, heart: 75 },
    { day: 'Tue', steps: 10123, calories: 400, heart: 78 },
    { day: 'Wed', steps: 7894, calories: 290, heart: 72 },
    { day: 'Thu', steps: 12023, calories: 450, heart: 82 },
    { day: 'Fri', steps: 9456, calories: 380, heart: 76 },
    { day: 'Sat', steps: 15234, calories: 580, heart: 85 },
    { day: 'Sun', steps: 11345, calories: 420, heart: 79 },
  ];

  return (
    <View style={{ minHeight: '100%', backgroundColor: '#1a1a1a', padding: 24 }}>
      <View style={{ maxWidth: 1024, alignSelf: 'center' }}>
        {/* Navigation Tabs */}
        <View style={{ marginBottom: 32, flexDirection: 'row', gap: 16 }}>
          {['Dashboard', 'History', 'Profile'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor:
                  activeTab === tab.toLowerCase() ? '#dc2626' : '#374151',
              }}
              onPress={() => setActiveTab(tab.toLowerCase())}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: activeTab === tab.toLowerCase() ? 'white' : '#d1d5db',
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
          {/* Today's Progress Card */}
          <Card style={{ backgroundColor: '#111827', borderColor: '#dc2626' }}>
            <CardHeader>
              <CardTitle style={{ flexDirection: 'row', alignItems: 'center', gap: 8, color: '#ef4444' }}>
                <Activity size={24} color="#ef4444" />
                <Text style={{ fontSize: 18, fontWeight: '600' }}>Today's Progress</Text>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <View style={{ position: 'relative', height: 16, backgroundColor: '#374151', borderRadius: 8 }}>
                <View
                  style={{
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: '#ef4444',
                    width: `${(todayStats.steps / todayStats.goal) * 100}%`,
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <View style={{ backgroundColor: '#111827', padding: 16, borderRadius: 8, flex: 1, marginRight: 8 }}>
                  <Activity size={24} color="#ef4444" style={{ alignSelf: 'center', marginBottom: 8 }} />
                  <Text style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>{todayStats.steps}</Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af' }}>Steps</Text>
                </View>
                <View style={{ backgroundColor: '#111827', padding: 16, borderRadius: 8, flex: 1, marginRight: 8 }}>
                  <Flame size={24} color="#ef4444" style={{ alignSelf: 'center', marginBottom: 8 }} />
                  <Text style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>{todayStats.calories}</Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af' }}>Calories</Text>
                </View>
                <View style={{ backgroundColor: '#111827', padding: 16, borderRadius: 8, flex: 1 }}>
                  <Heart size={24} color="#ef4444" style={{ alignSelf: 'center', marginBottom: 8 }} />
                  <Text style={{ fontSize: 24, fontWeight: '700', color: 'white' }}>{todayStats.heart}</Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af' }}>BPM</Text>
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Weekly Activity Card */}
          <Card style={{ backgroundColor: '#111827', borderColor: '#dc2626', flex: 1 }}>
            <CardHeader>
              <CardTitle style={{ color: '#ef4444' }}>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={{ height: 256 }}>
                <LineChart
                  width={800}
                  height={200}
                  data={activityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="day" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Line type="monotone" dataKey="steps" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;
