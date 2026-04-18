import { MaterialSymbols } from "@/components/ui/icon-symbol";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalculatorScreen() {
  const [currentVal, setCurrentVal] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [previousVal, setPreviousVal] = useState<string | null>(null);

  const handleTap = (type: string, value: string) => {
    if (type === "number") {
      if (currentVal === "0") {
        setCurrentVal(value);
      } else {
        setCurrentVal(currentVal + value);
      }
    }

    if (type === "clear") {
      setCurrentVal("0");
      setOperator(null);
      setPreviousVal(null);
    }

    if (type === "posneg") {
      setCurrentVal((parseFloat(currentVal) * -1).toString());
    }

    if (type === "percentage") {
      setCurrentVal((parseFloat(currentVal) * 0.01).toString());
    }

    if (type === "operator") {
      setOperator(value);
      setPreviousVal(currentVal);
      setCurrentVal("0");
    }

    if (type === "equal") {
      const current = parseFloat(currentVal);
      const previous = parseFloat(previousVal || "0");

      if (operator === "+") {
        setCurrentVal((previous + current).toString());
      } else if (operator === "−" || operator === "-") {
        setCurrentVal((previous - current).toString());
      } else if (operator === "×" || operator === "*") {
        setCurrentVal((previous * current).toString());
      } else if (operator === "÷" || operator === "/") {
        setCurrentVal((previous / current).toString());
      }

      setOperator(null);
      setPreviousVal(null);
    }
  };

  const onPress = (btn: string) => {
    switch (btn) {
      case "AC":
        handleTap("clear", btn);
        break;
      case "+/-":
        handleTap("posneg", btn);
        break;
      case "%":
        handleTap("percentage", btn);
        break;
      case "÷":
      case "×":
      case "−":
      case "+":
        handleTap("operator", btn);
        break;
      case "=":
        handleTap("equal", btn);
        break;
      default:
        handleTap("number", btn);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialSymbols name="grid-view" size={24} color="#191c1e" />
          <Text style={styles.headerTitle}>The Hub</Text>
        </View>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIt4bizLddE_P6gdhHOBMcZ3blbo5fTlZREet6owRK6li_04Jms_sPJpY0_9iTlo7eo4qKnrwf17NzRkuCT19R1laA4GC5fd_qohaZicJiTmljv-TW_gL1YS9uxP6JzMstDRmZAY2oOb7biBIR_g79lUJmnD91BM_16YlPYjg2sSY2K-JGRs2rcu5eJFJQEMxoNkV9NF4liQkRQbuAiey202G2Q1VUjb71eqw-FtmxyLWqMVREdVZUsZaPjxuTMTKa9EoCpDrnQ3ex",
          }}
          style={styles.avatar}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Display Area */}
        <View style={styles.displaySection}>
          <Text style={styles.historyText}>
            History: {previousVal ? `${previousVal} ${operator || ""}` : " "}
          </Text>
          <Text
            style={styles.mainDisplayText}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {currentVal}
          </Text>
          <View style={styles.displayIndicator} />
        </View>

        {/* Bento Grid Calculator Buttons */}
        <View style={styles.grid}>
          {/* Row 1 */}
          <TouchableOpacity
            style={styles.btnHigh}
            onPress={() => onPress("AC")}
          >
            <Text style={[styles.btnTextBold, { color: "#ba1a1a" }]}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnHigh}
            onPress={() => onPress("+/-")}
          >
            <Text style={styles.btnTextBold}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHigh} onPress={() => onPress("%")}>
            <Text style={styles.btnTextBold}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => onPress("÷")}
          >
            <MaterialSymbols name="search" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Row 2 */}
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("7")}
          >
            <Text style={styles.btnTextHuge}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("8")}
          >
            <Text style={styles.btnTextHuge}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("9")}
          >
            <Text style={styles.btnTextHuge}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => onPress("×")}
          >
            <MaterialSymbols name="close" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Row 3 */}
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("4")}
          >
            <Text style={styles.btnTextHuge}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("5")}
          >
            <Text style={styles.btnTextHuge}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("6")}
          >
            <Text style={styles.btnTextHuge}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => onPress("−")}
          >
            <MaterialSymbols name="remove" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Row 4 */}
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("1")}
          >
            <Text style={styles.btnTextHuge}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("2")}
          >
            <Text style={styles.btnTextHuge}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress("3")}
          >
            <Text style={styles.btnTextHuge}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => onPress("+")}
          >
            <MaterialSymbols name="add" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Row 5 */}
          <TouchableOpacity
            style={[styles.btnLowest, styles.btnZero]}
            onPress={() => onPress("0")}
          >
            <Text style={styles.btnTextHuge}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLowest}
            onPress={() => onPress(".")}
          >
            <Text style={styles.btnTextHuge}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnPrimaryContainer}
            onPress={() => onPress("=")}
          >
            <MaterialSymbols name="equal" size={32} color="#fefcff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get("window").width;
const spacing = 16;
const padding = 24;
const availableWidth = windowWidth - padding * 2 - spacing * 3;
const buttonSize = availableWidth / 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eceef0",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#191c1e",
    letterSpacing: -0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e6e8ea",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  displaySection: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: 192,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  historyText: {
    color: "#424754",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  mainDisplayText: {
    fontSize: 72,
    fontWeight: "800",
    color: "#191c1e",
    letterSpacing: -2,
    textAlign: "right",
  },
  displayIndicator: {
    width: 48,
    height: 6,
    backgroundColor: "#2170e4",
    borderRadius: 999,
    marginTop: 16,
    opacity: 0.2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing,
  },
  btnHigh: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: "#e6e8ea",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLowest: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  btnPrimary: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: "#0058be",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryContainer: {
    width: buttonSize,
    height: buttonSize,
    backgroundColor: "#2170e4",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2170e4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  btnZero: {
    width: buttonSize * 2 + spacing,
    alignItems: "flex-start",
    paddingLeft: buttonSize / 2 - 4,
  },
  btnTextBold: {
    fontSize: 20,
    fontWeight: "700",
    color: "#191c1e",
  },
  btnTextHuge: {
    fontSize: 24,
    fontWeight: "700",
    color: "#191c1e",
  },
});
