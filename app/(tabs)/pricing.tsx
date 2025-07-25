import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { pricingData } from "@/constants/data";

const { width } = Dimensions.get("window");

// Type definitions
interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  originalPrice?: number;
  badge?: string;
  features: string[];
  isPopular?: boolean;
}

interface FeatureItemProps {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

// Feature Item Component
const FeatureItem: React.FC<FeatureItemProps> = ({ text, included }) => (
  <View style={styles.featureItem}>
    <View style={[styles.checkIcon, { backgroundColor: "#ae2039" }]}>
      <Ionicons
        name={included ? "checkmark" : "close"}
        size={16}
        color={included ? "white" : "#9ca3af"}
      />
    </View>
    <Text
      style={[styles.featureText, { color: included ? "#374151" : "#9ca3af" }]}
    >
      {text}
    </Text>
  </View>
);

// Pricing Card Component
const PricingCard: React.FC<PricingCardProps> = ({ plan }) => (
  <TouchableOpacity
    style={[styles.pricingCard, plan.isPopular && styles.popularCard]}
    activeOpacity={0.8}
  >
    {/* Custom Badge */}
    {plan.badge && (
      <View style={styles.customBadge}>
        <Text style={styles.customBadgeText}>{plan.badge}</Text>
      </View>
    )}

    {/* Price Circle */}
    <View style={[styles.priceCircle, { backgroundColor: "#f3f4f6" }]}>
      <View style={styles.priceContent}>
        {plan.originalPrice && (
          <Text style={styles.originalPrice}>${plan.originalPrice}</Text>
        )}
        <Text style={[styles.price, { color: "#ae2039" }]}>${plan.price}</Text>
        <Text style={[styles.duration, { color: "#6b7280" }]}>
          {plan.duration}
        </Text>
      </View>
    </View>

    {/* Plan Name */}
    <Text style={styles.planName}>{plan.name}</Text>

    {/* Includes Label */}
    <Text style={styles.includesLabel}>Includes:</Text>

    {/* Features List */}
    <View style={styles.featuresContainer}>
      {plan.features.map((feature, index) => (
        <FeatureItem key={index} text={feature} included={true} />
      ))}
    </View>
  </TouchableOpacity>
);

// Main Pricing Component
const PremiumPricingScreen: React.FC = () => {
  const plan = pricingData.pricingDetails;

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PricingCard plan={plan} />

        {/* Subscription Details */}
        <View style={styles.subDetailsContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
            Subscription Details
          </Text>
          <View style={styles.featuresContainer}>
            {pricingData.subscriptionDetails.map((feature, index) => (
              <FeatureItem key={index} text={feature} included={true} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionButtonWrapper}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.actionButton, { backgroundColor: "#f3f3f3" }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.likeButtonText, { color: "black" }]}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtonWrapper}>
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/pay")}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Text style={styles.likeButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PremiumPricingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  placeholder: {
    width: 40,
  },
  subtitleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  pricingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#f3f4f6",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderColor: "#ae2039",
    shadowColor: "#ae2039",
    shadowOpacity: 0.2,
  },
  popularCard: {
    marginTop: 30,
  },
  popularBadge: {
    position: "absolute",
    top: -15,
    left: 24,
    right: 24,
    backgroundColor: "#ae2039",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  popularBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  customBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#f59e0b",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  customBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  priceCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  priceContent: {
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 14,
    color: "#9ca3af",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    fontWeight: "500",
  },
  planName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
  },
  includesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  selectionIndicator: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  subDetailsContainer: {
    justifyContent: "space-around",
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
  },
  actionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    gap: 12,
  },

  actionButtonWrapper: {
    flex: 1,
  },

  actionButton: {
    height: 50,
    borderRadius: 40,
    backgroundColor: "#ae2039",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  likeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
