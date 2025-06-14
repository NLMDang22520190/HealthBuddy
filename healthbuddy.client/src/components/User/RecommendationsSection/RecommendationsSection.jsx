import React, { useState, useEffect } from "react";
import { Card, Tabs, Spin, Alert, Button, Empty, message } from "antd";
import {
  AppleOutlined,
  ThunderboltOutlined,
  FireOutlined,
  SettingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import RecommendationCard from "../RecommendationCard/RecommendationCard";
import { recommendationAPI } from "../../../features/RecommendationAPI/RecommendationAPI";

const { TabPane } = Tabs;

const RecommendationsSection = () => {
  const [activeTab, setActiveTab] = useState("personalized");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState({
    foods: [],
    exercises: [],
    trending: { foods: [], exercises: [] },
  });
  const [healthSummary, setHealthSummary] = useState(null);

  const userId = useSelector((state) => state.auth.userId);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Fetch personalized recommendations
  const fetchPersonalizedRecommendations = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const [personalizedData, healthData] = await Promise.all([
        recommendationAPI.getPersonalizedRecommendations(userId, 6, 6),
        recommendationAPI.getUserHealthSummary(userId),
      ]);

      setRecommendations((prev) => ({
        ...prev,
        foods: personalizedData.recommendedFoods,
        exercises: personalizedData.recommendedExercises,
      }));
      setHealthSummary(healthData);
    } catch (error) {
      console.error("Error fetching personalized recommendations:", error);
      message.error("Failed to load personalized recommendations");
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending recommendations
  const fetchTrendingRecommendations = async () => {
    setLoading(true);
    try {
      const [trendingFoods, trendingExercises] = await Promise.all([
        recommendationAPI.getTrendingFoods(6),
        recommendationAPI.getTrendingExercises(6),
      ]);

      setRecommendations((prev) => ({
        ...prev,
        trending: {
          foods: trendingFoods,
          exercises: trendingExercises,
        },
      }));
    } catch (error) {
      console.error("Error fetching trending recommendations:", error);
      message.error("Failed to load trending recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "personalized" && isAuthenticated) {
      fetchPersonalizedRecommendations();
    } else if (activeTab === "trending") {
      fetchTrendingRecommendations();
    }
  }, [activeTab, userId, isAuthenticated]);

  const handleRefresh = () => {
    if (activeTab === "personalized") {
      fetchPersonalizedRecommendations();
    } else {
      fetchTrendingRecommendations();
    }
  };

  const renderHealthSummary = () => {
    if (!healthSummary || !isAuthenticated) return null;

    return (
      <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <span className="text-xl">📊</span>
              </div>
              Your Health Summary
            </h3>
            <Button
              icon={<SettingOutlined />}
              type="text"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-200"
              onClick={() => message.info("Preference settings coming soon!")}
            >
              Settings
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {healthSummary.height && (
              <div className="group">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-2xl mb-2">📏</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {healthSummary.height}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Height (cm)
                  </div>
                </div>
              </div>
            )}

            {healthSummary.weight && (
              <div className="group">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-2xl mb-2">⚖️</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {healthSummary.weight}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Weight (kg)
                  </div>
                </div>
              </div>
            )}

            {healthSummary.bmi && (
              <div className="group">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 rounded-xl border border-orange-200 dark:border-orange-700 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    {healthSummary.bmi}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    BMI
                  </div>
                </div>
              </div>
            )}

            {healthSummary.targetCaloriesPerDay && (
              <div className="group">
                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/30 rounded-xl border border-red-200 dark:border-red-700 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                    {healthSummary.targetCaloriesPerDay}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Target Calories
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Health Info */}
          {(healthSummary.healthCondition || healthSummary.allergies) && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-3">
                {healthSummary.healthCondition && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-full border border-yellow-200 dark:border-yellow-700">
                    <span className="text-sm">🏥</span>
                    <span className="text-sm font-medium">
                      {healthSummary.healthCondition}
                    </span>
                  </div>
                )}
                {healthSummary.allergies && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full border border-red-200 dark:border-red-700">
                    <span className="text-sm">⚠️</span>
                    <span className="text-sm font-medium">
                      Allergic to {healthSummary.allergies}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const renderRecommendationGrid = (items, type) => {
    if (!items || items.length === 0) {
      return (
        <Empty
          description={`No ${type} recommendations available`}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }

    return (
      <div className="space-y-4 animate-fadeIn">
        {items.map((item, index) => (
          <div
            key={index}
            className="transform transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <RecommendationCard recommendation={item} type={type} />
          </div>
        ))}
      </div>
    );
  };

  const renderPersonalizedTab = () => (
    <div className="space-y-6">
      {renderHealthSummary()}

      <div>
        <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-100 dark:border-green-700">
          <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <AppleOutlined className="text-green-600 dark:text-green-400 text-lg" />
            </div>
            Recommended Foods for You
          </h3>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
            size="small"
            className="hover:scale-105 transition-transform duration-200"
          >
            Refresh
          </Button>
        </div>
        {renderRecommendationGrid(recommendations.foods, "food")}
      </div>

      <div>
        <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-100 dark:border-blue-700">
          <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <ThunderboltOutlined className="text-blue-600 dark:text-blue-400 text-lg" />
            </div>
            Recommended Exercises for You
          </h3>
        </div>
        {renderRecommendationGrid(recommendations.exercises, "exercise")}
      </div>
    </div>
  );

  const renderTrendingTab = () => (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-100 dark:border-red-700">
          <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <FireOutlined className="text-red-600 dark:text-red-400 text-lg" />
            </div>
            Trending Foods
          </h3>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
            size="small"
            className="hover:scale-105 transition-transform duration-200"
          >
            Refresh
          </Button>
        </div>
        {renderRecommendationGrid(recommendations.trending.foods, "food")}
      </div>

      <div>
        <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-100 dark:border-orange-700">
          <h3 className="text-xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <FireOutlined className="text-orange-600 dark:text-orange-400 text-lg" />
            </div>
            Trending Exercises
          </h3>
        </div>
        {renderRecommendationGrid(
          recommendations.trending.exercises,
          "exercise"
        )}
      </div>
    </div>
  );

  if (!isAuthenticated && activeTab === "personalized") {
    return (
      <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl bg-white dark:bg-gray-800">
        <Alert
          message="🔐 Login Required"
          description="Please login to see personalized recommendations based on your health profile and preferences."
          type="info"
          showIcon
          className="border-0 bg-transparent dark:text-white"
          action={
            <Button
              type="primary"
              size="small"
              className="hover:scale-105 transition-transform duration-200"
            >
              Login
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-500">
      <div className="flex justify-between items-center mb-6 p-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          Recommendations for You
        </h2>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="custom-tabs"
        size="large"
        tabBarStyle={{
          borderBottom: "2px solid #f0f0f0",
          marginBottom: "24px",
        }}
      >
        <TabPane
          tab={
            <span className="flex items-center gap-2 px-4 py-2 font-semibold">
              <AppleOutlined className="text-lg" />
              Personalized
            </span>
          }
          key="personalized"
        >
          <Spin
            spinning={loading}
            className="min-h-[200px] flex items-center justify-center"
          >
            {renderPersonalizedTab()}
          </Spin>
        </TabPane>

        <TabPane
          tab={
            <span className="flex items-center gap-2 px-4 py-2 font-semibold">
              <FireOutlined className="text-lg" />
              Trending
            </span>
          }
          key="trending"
        >
          <Spin
            spinning={loading}
            className="min-h-[200px] flex items-center justify-center"
          >
            {renderTrendingTab()}
          </Spin>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default RecommendationsSection;
