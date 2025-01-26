import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationMenu from '../NavigationMenu';
import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/firebaseConfig';
import Layout from '../../components/Layout';

const EmployeeTimeline = () => {
  const { authState } = useContext(AuthContext);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const userClockedRef = collection(db, 'user-clocked');
        const q = query(
          userClockedRef,
          where('userId', '==', authState.user.id)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => {
          const record = doc.data();
          const startTime = new Date(record.startTime);
          const endTime = new Date(record.endTime);
          const diffInMilliseconds = endTime - startTime;
          const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

          return {
            ...record,
            diffInHours,
          };
        });
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      }
      fetchTimelineData();
    };
  }, [authState.userId]);

  return (
    <Layout isAdmin={authState.user.isAdmin}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Working Timeline</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {timelineData?.map((monthData, index) => (
          <View key={index} style={styles.monthCard}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthTitle}>{monthData?.month}</Text>
              <View style={styles.totalHoursContainer}>
                <Ionicons name="time-outline" size={20} color="#007AFF" />
                <Text style={styles.totalHoursText}>
                  {monthData?.totalHours}h total
                </Text>
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Regular Hours</Text>
                <Text style={styles.statValue}>{monthData?.regularHours}h</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Overtime</Text>
                <Text style={styles.statValue}>{monthData?.overtime}h</Text>
              </View>
            </View>

            {/* Daily Records */}
            <View style={styles.dailyRecordsContainer}>
              <Text style={styles.sectionTitle}>Daily Records</Text>
              {monthData?.dailyRecords?.map((record, recordIndex) => (
                <View key={recordIndex} style={styles.dailyRecord}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{record.date}</Text>
                    <View
                      style={[
                        styles.statusIndicator,
                        {
                          backgroundColor:
                            record.status === 'completed'
                              ? '#34C759'
                              : '#FF9500',
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.hoursContainer}>
                    <Text style={styles.hoursText}>{record.hours} hours</Text>
                    <TouchableOpacity style={styles.detailsButton}>
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#8E8E93"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  monthCard: {
    backgroundColor: '#2C2C2E',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalHoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  totalHoursText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    color: '#8E8E93',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  dailyRecordsContainer: {
    marginTop: 16,
  },
  dailyRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3C3C3E',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hoursText: {
    color: '#8E8E93',
    fontSize: 15,
  },
  detailsButton: {
    padding: 4,
  },
});

export default EmployeeTimeline;
