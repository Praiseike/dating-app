import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Type definitions
interface PaymentFormData {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvc: string;
}

interface CreditCardProps {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cardType: string;
}

// Credit Card Component
const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  holderName,
  expiryDate,
  cardType,
}) => {
  const formatCardNumber = (number: string): string => {
    const cleaned = number.replace(/\s/g, "");
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted || "0000 0000 0000 0000";
  };

  const getCardGradient = (): string[] => {
    switch (cardType) {
      case "visa":
        return ["#1e3a8a", "#3b82f6"];
      case "mastercard":
        return ["#dc2626", "#f59e0b"];
      case "amex":
        return ["#059669", "#10b981"];
      default:
        return ["#ae2039", "#dc2626"];
    }
  };

  const CardNetworkLogo = () => {
    switch (cardType) {
      case "visa":
        return <Text style={styles.cardLogo}>VISA</Text>;
      case "mastercard":
        return (
          <View style={styles.mastercardLogo}>
            <View
              style={[styles.mastercardCircle, { backgroundColor: "#eb001b" }]}
            />
            <View
              style={[
                styles.mastercardCircle,
                { backgroundColor: "#f79e1b", marginLeft: -8 },
              ]}
            />
          </View>
        );
      case "amex":
        return <Text style={styles.cardLogo}>AMEX</Text>;
      default:
        return <Text style={styles.cardLogo}>CARD</Text>;
    }
  };

  return (
    <View
      style={[styles.creditCard, { backgroundColor: getCardGradient()[0] }]}
    >
      {/* Background gradient effect */}
      <View style={[styles.cardGradient, { backgroundColor: "#f15664" }]} />

      {/* Card network logo */}
      <View style={styles.cardHeader}>
        <View style={styles.chipContainer}>
          <View style={styles.chip}>
            <View style={styles.chipInner} />
          </View>
        </View>
        <CardNetworkLogo />
      </View>

      {/* Card number */}
      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumber}>{formatCardNumber(cardNumber)}</Text>
      </View>

      {/* Card details */}
      <View style={styles.cardFooter}>
        <View style={styles.cardDetail}>
          <Text style={styles.cardLabel}>CARD HOLDER</Text>
          <Text style={styles.cardValue}>
            {holderName.toUpperCase() || "HOLDER NAME"}
          </Text>
        </View>
        <View style={styles.cardDetail}>
          <Text style={styles.cardLabel}>EXPIRES</Text>
          <Text style={styles.cardValue}>{expiryDate || "MM/YY"}</Text>
        </View>
      </View>

      {/* Decorative elements */}
      <View style={styles.cardDecoration1} />
      <View style={styles.cardDecoration2} />
    </View>
  );
};

// Main Payment Form Component
const PaymentFormScreen: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    holderName: "",
    expiryDate: "",
    cvc: "",
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>("");

  const amount = 39.9;
  const router = useRouter();
  // Detect card type based on card number
  const detectCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "mastercard";
    if (cleaned.startsWith("3")) return "amex";
    return "default";
  };

  // Format card number input
  const formatCardNumberInput = (text: string): string => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  // Format expiry date
  const formatExpiryDate = (text: string): string => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  // Handle input changes
  const handleInputChange = (
    field: keyof PaymentFormData,
    value: string
  ): void => {
    let formattedValue = value;

    switch (field) {
      case "cardNumber":
        formattedValue = formatCardNumberInput(value);
        break;
      case "expiryDate":
        formattedValue = formatExpiryDate(value);
        break;
      case "cvc":
        formattedValue = value.replace(/\D/g, "").substring(0, 4);
        break;
      case "holderName":
        formattedValue = value.replace(/[^a-zA-Z\s]/g, "");
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  // Validate form
  const isFormValid = (): boolean => {
    const { cardNumber, holderName, expiryDate, cvc } = formData;
    return (
      cardNumber.replace(/\s/g, "").length >= 13 &&
      holderName.trim().length >= 2 &&
      expiryDate.length === 5 &&
      cvc.length >= 3
    );
  };

  // Handle payment
  const handlePayment = async (): Promise<void> => {
    if (!isFormValid()) {
      Alert.alert("Error", "Please fill in all required fields correctly.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert("Success", "Payment processed successfully!", [
        { text: "OK", onPress: () => console.log("Payment completed") },
      ]);
    }, 2000);
  };

  const handleCancel = (): void => {
    Alert.alert("Cancel Payment", "Are you sure you want to cancel?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => router.back() },
    ]);
  };

  const cardType = detectCardType(formData.cardNumber);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Amount Section */}
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Amount:</Text>
            <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
          </View>

          {/* Credit Card Display */}
          <View style={styles.cardContainer}>
            <CreditCard
              cardNumber={formData.cardNumber}
              holderName={formData.holderName}
              expiryDate={formData.expiryDate}
              cardType={cardType}
            />
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Card Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === "cardNumber" && styles.inputFocused,
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="0000 0000 0000 0000"
                  value={formData.cardNumber}
                  onChangeText={(text) => handleInputChange("cardNumber", text)}
                  onFocus={() => setFocusedField("cardNumber")}
                  onBlur={() => setFocusedField("")}
                  keyboardType="numeric"
                  maxLength={19}
                />
                <View style={styles.cardTypeIndicator}>
                  <Ionicons name="card" size={20} color="#9ca3af" />
                </View>
              </View>
            </View>

            {/* Holder Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Holder Name</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === "holderName" && styles.inputFocused,
                ]}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your Full Name"
                  value={formData.holderName}
                  onChangeText={(text) => handleInputChange("holderName", text)}
                  onFocus={() => setFocusedField("holderName")}
                  onBlur={() => setFocusedField("")}
                  autoCapitalize="words"
                />
                <Ionicons name="person" size={20} color="#9ca3af" />
              </View>
            </View>

            {/* Expiry Date and CVC */}
            <View style={styles.rowContainer}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Expired Date</Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "expiryDate" && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChangeText={(text) =>
                      handleInputChange("expiryDate", text)
                    }
                    onFocus={() => setFocusedField("expiryDate")}
                    onBlur={() => setFocusedField("")}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  <Ionicons name="calendar" size={20} color="#9ca3af" />
                </View>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>CVC</Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "cvc" && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    style={styles.textInput}
                    placeholder="123"
                    value={formData.cvc}
                    onChangeText={(text) => handleInputChange("cvc", text)}
                    onFocus={() => setFocusedField("cvc")}
                    onBlur={() => setFocusedField("")}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                  <Ionicons name="shield-checkmark" size={20} color="#9ca3af" />
                </View>
              </View>
            </View>
          </View>

          {/* Security Info */}
          <View style={styles.securityInfo}>
            <Ionicons name="shield-checkmark" size={20} color="#10b981" />
            <Text style={styles.securityText}>
              Your payment information is secure and encrypted
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={isProcessing}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.payButton,
              !isFormValid() && styles.payButtonDisabled,
            ]}
            onPress={handlePayment}
            disabled={!isFormValid() || isProcessing}
          >
            {isProcessing ? (
              <Text style={styles.payButtonText}>Processing...</Text>
            ) : (
              <>
                <Text style={styles.payButtonText}>
                  Pay ${amount.toFixed(2)}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingTop: StatusBar.currentHeight,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  amountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "white",
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  amountValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ae2039",
  },
  cardContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  creditCard: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    padding: 24,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  cardGradient: {
    transform: [{ rotate: "30deg" }],
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: "60%",
    opacity: 0.8,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  chipContainer: {
    width: 50,
    height: 35,
  },
  chip: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffd700",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  chipInner: {
    width: "80%",
    height: "70%",
    backgroundColor: "#ffed4e",
    borderRadius: 3,
    opacity: 0.7,
  },
  cardLogo: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  mastercardLogo: {
    flexDirection: "row",
    alignItems: "center",
  },
  mastercardCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  cardNumberContainer: {
    marginBottom: 24,
  },
  cardNumber: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardDetail: {
    flex: 1,
  },
  cardLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: 1,
  },
  cardValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  cardDecoration1: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  cardDecoration2: {
    position: "absolute",
    bottom: -20,
    left: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  formContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputFocused: {
    borderColor: "#ae2039",
    shadowColor: "#ae2039",
    shadowOpacity: 0.1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 12,
  },
  cardTypeIndicator: {
    marginLeft: 8,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingHorizontal: 24,
    gap: 8,
  },
  securityText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingVertical: 16,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
  payButton: {
    flex: 2,
    backgroundColor: "#ae2039",
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#ae2039",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  payButtonDisabled: {
    backgroundColor: "#d1d5db",
    shadowOpacity: 0,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
