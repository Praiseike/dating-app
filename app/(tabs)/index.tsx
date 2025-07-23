import { navigationItems, profiles, tabs } from '@/constants/data';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; 


export default function LikeYouScreen() {
  const [activeTab, setActiveTab] = useState("Recent");
  const [likedProfiles, setLikedProfiles] = useState(new Set([3]));
  const router = useRouter();

  const toggleLike = (profileId: number) => {
    const newLikedProfiles = new Set(likedProfiles);
    if (newLikedProfiles.has(profileId)) {
      newLikedProfiles.delete(profileId);
    } else {
      newLikedProfiles.add(profileId);
    }
    setLikedProfiles(newLikedProfiles);
  };

  const onProfilePress = (profileId: number) => {
    console.log(`Navigate to profile ${profileId}`);
    router.push(`/profile/${profileId}`)
  };

  const renderProfileCard = ({ item, index }: any) => (
    <TouchableOpacity
      style={[
        styles.profileCard,
        { marginLeft: index % 2 === 0 ? 0 : 12 }
      ]}
      onPress={() => onProfilePress(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      
      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />
      

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>
          {item.name}, {item.age}
        </Text>
        <Text style={styles.profileDistance}>{item.distance}</Text>
      </View>

      {/* Like Button */}
      {likedProfiles.has(item.id) && (
        <View style={styles.likeOverlay}>
          <View style={styles.likeButton}>
            <Ionicons name="heart" size={32} color="#ec4899" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderTabButton = (tab: any) => (
    <TouchableOpacity
      key={tab.label}
      style={[
        styles.tabButton,
        activeTab === tab.label ? styles.activeTabButton : styles.inactiveTabButton
      ]}
      onPress={() => setActiveTab(tab.label)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.tabButtonText,
        activeTab === tab.label ? styles.activeTabText : styles.inactiveTabText
      ]}>
        {tab.label} {tab.count}
      </Text>
    </TouchableOpacity>
  );

  const renderNavigationItem = (item: any) => (
    <TouchableOpacity
      key={item.label}
      style={styles.navItem}
      activeOpacity={0.7}
    >
      <View style={styles.navIconContainer}>
        <Ionicons
          name={item.icon}
          size={24}
          color={item.active ? "#ec4899" : "#9ca3af"}
        />
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.badge > 99 ? "99+" : item.badge}
            </Text>
          </View>
        )}
      </View>
      <Text style={[
        styles.navLabel,
        { color: item.active ? "#ec4899" : "#9ca3af" }
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      



      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Like You</Text>
          <View style={styles.premiumBadge}>
            <Ionicons name="heart" size={12} color="white" />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Ionicons name="filter" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(renderTabButton)}
      </View>

      {/* Profile Grid */}
      <FlatList
        data={profiles}
        renderItem={renderProfileCard}
        numColumns={2}
        contentContainerStyle={styles.profileGrid}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <View style={styles.navContainer}>
          {navigationItems.map(renderNavigationItem)}
        </View>

        <View style={styles.homeIndicator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: StatusBar.currentHeight
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  statusTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalDots: {
    flexDirection: 'row',
    gap: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ec4899',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  premiumText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  filterButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 24,
    borderRadius: 22,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inactiveTabButton: {
    backgroundColor: 'transparent',
  },
  tabButtonText: {
    fontSize: 14,
  },
  activeTabText: {
    color: '#111827',
    fontWeight: '500',
  },
  inactiveTabText: {
    color: '#6b7280',
  },
  profileGrid: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  profileCard: {
    width: cardWidth,
    aspectRatio: 3/4,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'transparent',
    // background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  profileName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  profileDistance: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  likeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ec4899',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  navLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  homeIndicator: {
    alignSelf: 'center',
    width: 128,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
    marginBottom: 8,
  },
});