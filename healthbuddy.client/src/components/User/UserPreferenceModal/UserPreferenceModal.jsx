import React, { useState, useEffect } from "react";
import { 
  Modal, 
  Form, 
  Select, 
  InputNumber, 
  Button, 
  message, 
  Divider,
  Tag,
  Space,
  Card
} from "antd";
import { useSelector } from "react-redux";
import { userPreferenceAPI } from "../../../features/RecommendationAPI/RecommendationAPI";

const { Option } = Select;

const UserPreferenceModal = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [existingPreferences, setExistingPreferences] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (visible && userId) {
      fetchExistingPreferences();
    }
  }, [visible, userId]);

  const fetchExistingPreferences = async () => {
    try {
      const preferences = await userPreferenceAPI.getUserPreference(userId);
      setExistingPreferences(preferences);
      
      // Parse JSON strings back to arrays for form
      const formData = {
        ...preferences,
        dietaryRestrictions: preferences.dietaryRestrictions ? JSON.parse(preferences.dietaryRestrictions) : [],
        preferredCuisines: preferences.preferredCuisines ? JSON.parse(preferences.preferredCuisines) : [],
        dislikedIngredients: preferences.dislikedIngredients ? JSON.parse(preferences.dislikedIngredients) : [],
        preferredExerciseTypes: preferences.preferredExerciseTypes ? JSON.parse(preferences.preferredExerciseTypes) : [],
        preferredMuscleGroups: preferences.preferredMuscleGroups ? JSON.parse(preferences.preferredMuscleGroups) : [],
        fitnessGoals: preferences.fitnessGoals ? JSON.parse(preferences.fitnessGoals) : [],
        healthGoals: preferences.healthGoals ? JSON.parse(preferences.healthGoals) : []
      };
      
      form.setFieldsValue(formData);
    } catch (error) {
      console.log("No existing preferences found, starting fresh");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Convert arrays to JSON strings
      const preferenceData = {
        userId: userId,
        dietaryRestrictions: JSON.stringify(values.dietaryRestrictions || []),
        preferredCuisines: JSON.stringify(values.preferredCuisines || []),
        dislikedIngredients: JSON.stringify(values.dislikedIngredients || []),
        maxCookingTime: values.maxCookingTime,
        preferredDifficultyLevel: values.preferredDifficultyLevel,
        targetCaloriesPerMeal: values.targetCaloriesPerMeal,
        preferredExerciseTypes: JSON.stringify(values.preferredExerciseTypes || []),
        preferredMuscleGroups: JSON.stringify(values.preferredMuscleGroups || []),
        maxWorkoutDuration: values.maxWorkoutDuration,
        fitnessGoals: JSON.stringify(values.fitnessGoals || []),
        preferredWorkoutTime: values.preferredWorkoutTime,
        fitnessLevel: values.fitnessLevel,
        targetWeight: values.targetWeight,
        targetCaloriesPerDay: values.targetCaloriesPerDay,
        healthGoals: JSON.stringify(values.healthGoals || []),
        activityLevel: values.activityLevel
      };

      await userPreferenceAPI.createOrUpdateUserPreference(preferenceData);
      message.success("Preferences saved successfully!");
      onSuccess && onSuccess();
      onCancel();
    } catch (error) {
      message.error("Failed to save preferences");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="🎯 Set Your Health & Fitness Preferences"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      className="user-preference-modal"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Card title="🍎 Food Preferences" size="small" className="mb-4">
          <Form.Item
            name="dietaryRestrictions"
            label="Dietary Restrictions"
          >
            <Select
              mode="multiple"
              placeholder="Select your dietary restrictions"
              options={[
                { label: "Vegetarian", value: "vegetarian" },
                { label: "Vegan", value: "vegan" },
                { label: "Keto", value: "keto" },
                { label: "Low Carb", value: "low-carb" },
                { label: "Gluten Free", value: "gluten-free" },
                { label: "Dairy Free", value: "dairy-free" },
                { label: "Low Sodium", value: "low-sodium" }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="preferredCuisines"
            label="Preferred Cuisines"
          >
            <Select
              mode="multiple"
              placeholder="Select your favorite cuisines"
              options={[
                { label: "Asian", value: "asian" },
                { label: "Mediterranean", value: "mediterranean" },
                { label: "Italian", value: "italian" },
                { label: "Mexican", value: "mexican" },
                { label: "Indian", value: "indian" },
                { label: "American", value: "american" }
              ]}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="maxCookingTime"
              label="Max Cooking Time (minutes)"
            >
              <InputNumber min={5} max={180} placeholder="30" className="w-full" />
            </Form.Item>

            <Form.Item
              name="preferredDifficultyLevel"
              label="Cooking Difficulty"
            >
              <Select placeholder="Select difficulty">
                <Option value="easy">Easy</Option>
                <Option value="medium">Medium</Option>
                <Option value="hard">Hard</Option>
              </Select>
            </Form.Item>
          </div>
        </Card>

        <Card title="💪 Exercise Preferences" size="small" className="mb-4">
          <Form.Item
            name="preferredExerciseTypes"
            label="Preferred Exercise Types"
          >
            <Select
              mode="multiple"
              placeholder="Select exercise types you enjoy"
              options={[
                { label: "Cardio", value: "cardio" },
                { label: "Strength", value: "strength" },
                { label: "Yoga", value: "yoga" },
                { label: "Pilates", value: "pilates" },
                { label: "HIIT", value: "hiit" },
                { label: "Swimming", value: "swimming" }
              ]}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="maxWorkoutDuration"
              label="Max Workout Duration (minutes)"
            >
              <InputNumber min={10} max={180} placeholder="60" className="w-full" />
            </Form.Item>

            <Form.Item
              name="fitnessLevel"
              label="Fitness Level (1-5)"
            >
              <InputNumber min={1} max={5} placeholder="3" className="w-full" />
            </Form.Item>
          </div>
        </Card>

        <Card title="🎯 Health Goals" size="small" className="mb-4">
          <Form.Item
            name="healthGoals"
            label="Health Goals"
          >
            <Select
              mode="multiple"
              placeholder="Select your health goals"
              options={[
                { label: "Lose Weight", value: "lose_weight" },
                { label: "Gain Muscle", value: "gain_muscle" },
                { label: "Maintain Weight", value: "maintain" },
                { label: "Improve Endurance", value: "endurance" },
                { label: "Heart Health", value: "heart_health" },
                { label: "Flexibility", value: "flexibility" }
              ]}
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="targetWeight"
              label="Target Weight (kg)"
            >
              <InputNumber min={30} max={200} placeholder="70" className="w-full" />
            </Form.Item>

            <Form.Item
              name="activityLevel"
              label="Activity Level"
            >
              <Select placeholder="Select activity level">
                <Option value="sedentary">Sedentary</Option>
                <Option value="lightly_active">Lightly Active</Option>
                <Option value="moderately_active">Moderately Active</Option>
                <Option value="very_active">Very Active</Option>
              </Select>
            </Form.Item>
          </div>
        </Card>

        <div className="flex justify-end space-x-2 pt-4">
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Preferences
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserPreferenceModal;
