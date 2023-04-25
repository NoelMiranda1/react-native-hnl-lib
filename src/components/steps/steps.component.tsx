import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

enum StepStatus {
  Normal,
  InProgress,
  Completed,
}
type Step = {
  id: number;
  title?: string;
  status: StepStatus;
};

type StepsProps = {
  steps: Step[];
  currentStep: number;
  customIndicatorStyle?: CustomStyleProp;
  customIcon?: JSX.Element;
};

const Steps: React.FC<StepsProps> = ({
  steps,
  currentStep,
  customIndicatorStyle,
  customIcon,
}) => {
  return (
    <View style={[styles.container]}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          <View
            style={[
              styles.stepIndicator,
              customIndicatorStyle,
              index === currentStep
                ? styles.currentStepIndicator
                : step.status === StepStatus.Completed
                ? styles.completedStepIndicator
                : styles.normalStepIndicator,
            ]}
          >
            {customIcon ? (
              customIcon
            ) : (
              <Text style={styles.check}>
                {step.status === StepStatus.Completed ? '✓' : index + 1}
              </Text>
            )}
          </View>
          <View style={styles.stepTextContainer}>
            {step.title && (
              <Text
                style={[
                  styles.stepTitle,
                  index === currentStep && styles.currentStepTitle,
                  step.status === StepStatus.Completed &&
                    styles.completedStepTitle,
                ]}
              >
                {step.title}
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  check: { color: '#fff', fontWeight: 'bold' },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepIndicator: {
    width: 20,
    height: 20,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  currentStepIndicator: {
    backgroundColor: '#007AFF',
  },
  completedStepIndicator: {
    backgroundColor: '#34C759',
  },
  normalStepIndicator: {
    backgroundColor: '#C7C7CC',
  },
  stepTextContainer: {},
  stepTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  currentStepTitle: {
    color: '#007AFF',
  },
  completedStepTitle: {
    color: '#34C759',
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
export { StepStatus };
export default Steps;
