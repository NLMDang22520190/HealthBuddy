# 🎯 HealthBuddy Recommendation System - Technical Documentation

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Design](#architecture-design)
3. [Recommendation Algorithm](#recommendation-algorithm)
4. [Data Flow](#data-flow)
5. [API Specifications](#api-specifications)
6. [Frontend Components](#frontend-components)
7. [Database Schema](#database-schema)
8. [Performance Optimization](#performance-optimization)

## 🌟 System Overview

HealthBuddy Recommendation System là một hệ thống AI-powered recommendation engine được thiết kế để cung cấp các đề xuất thực phẩm và bài tập cá nhân hóa dựa trên:

- **Dữ liệu sức khỏe cá nhân**: BMI, tình trạng sức khỏe, dị ứng
- **Preferences người dùng**: Sở thích ẩm thực, mục tiêu fitness
- **Behavioral patterns**: Lịch sử tương tác, feedback
- **Community trends**: Nội dung phổ biến trong cộng đồng

### 🎯 Core Objectives

- **Health-First Approach**: Ưu tiên lợi ích sức khỏe
- **Safety**: Loại bỏ hoàn toàn allergens
- **Personalization**: Recommendations phù hợp với từng cá nhân
- **Performance**: Response time < 500ms
- **Scalability**: Hỗ trợ hàng nghìn users đồng thời

## 🏗️ Architecture Design

### High-Level Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React Components]
        API_CLIENT[API Service Layer]
    end

    subgraph "Backend Layer"
        CONTROLLER[Recommendation Controller]
        SERVICE[Recommendation Service]
        CACHE[Memory Cache]
    end

    subgraph "Data Layer"
        DB[(SQL Server Database)]
        REPO[Repository Layer]
    end

    subgraph "External Services"
        AUTH[Auth0 Service]
        ANALYTICS[Analytics Service]
    end

    UI --> API_CLIENT
    API_CLIENT --> CONTROLLER
    CONTROLLER --> SERVICE
    SERVICE --> CACHE
    SERVICE --> REPO
    REPO --> DB
    SERVICE --> AUTH
    SERVICE --> ANALYTICS

    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef data fill:#e8f5e8
    classDef external fill:#fff3e0

    class UI,API_CLIENT frontend
    class CONTROLLER,SERVICE,CACHE backend
    class DB,REPO data
    class AUTH,ANALYTICS external
```

### Component Architecture

```mermaid
graph LR
    subgraph "Recommendation Engine"
        SCORER[Scoring Engine]
        FILTER[Filter Engine]
        RANKER[Ranking Engine]
    end

    subgraph "Data Sources"
        USER_DATA[User Data]
        HEALTH_DATA[Health Data]
        CONTENT_DATA[Content Data]
        INTERACTION_DATA[Interaction Data]
    end

    subgraph "Algorithms"
        CONTENT_BASED[Content-Based Filtering]
        HEALTH_BASED[Health-Based Filtering]
        POPULARITY_BASED[Popularity-Based Filtering]
        BMI_BASED[BMI-Based Scoring]
    end

    USER_DATA --> FILTER
    HEALTH_DATA --> HEALTH_BASED
    CONTENT_DATA --> CONTENT_BASED
    INTERACTION_DATA --> POPULARITY_BASED

    HEALTH_BASED --> SCORER
    CONTENT_BASED --> SCORER
    POPULARITY_BASED --> SCORER
    BMI_BASED --> SCORER

    FILTER --> SCORER
    SCORER --> RANKER

    classDef engine fill:#ffcdd2
    classDef data fill:#c8e6c9
    classDef algorithm fill:#bbdefb

    class SCORER,FILTER,RANKER engine
    class USER_DATA,HEALTH_DATA,CONTENT_DATA,INTERACTION_DATA data
    class CONTENT_BASED,HEALTH_BASED,POPULARITY_BASED,BMI_BASED algorithm
```

## 🧠 Recommendation Algorithm

### Multi-Factor Scoring System

Hệ thống sử dụng thuật toán scoring đa yếu tố với tổng điểm từ 0-100:

#### Food Recommendation Scoring

```mermaid
flowchart TD
    START([Start Food Recommendation]) --> GET_USER[Get User Data]
    GET_USER --> GET_HEALTH[Get Health Data]
    GET_HEALTH --> GET_PREFS[Get User Preferences]
    GET_PREFS --> GET_FOODS[Get Available Foods]

    GET_FOODS --> ALLERGY_CHECK{Has Allergies?}
    ALLERGY_CHECK -->|Yes| CHECK_ALLERGENS{Contains Allergens?}
    CHECK_ALLERGENS -->|Yes| EXCLUDE[Score = 0, Exclude]
    CHECK_ALLERGENS -->|No| CALC_SCORE[Calculate Score]
    ALLERGY_CHECK -->|No| CALC_SCORE

    CALC_SCORE --> POP_SCORE[Popularity Score: 0-20]
    POP_SCORE --> HEALTH_SCORE[Health Condition Score: 0-30]
    HEALTH_SCORE --> BMI_SCORE[BMI-Based Calorie Score: 0-25]
    BMI_SCORE --> DIFF_SCORE[Difficulty Score: 0-15]
    DIFF_SCORE --> TIME_SCORE[Cooking Time Score: 0-10]

    TIME_SCORE --> TOTAL_SCORE[Total Score = Sum of All Scores]
    TOTAL_SCORE --> RANK[Rank by Score]
    RANK --> RETURN[Return Top N Recommendations]

    EXCLUDE --> END([End])
    RETURN --> END

    classDef process fill:#e3f2fd
    classDef decision fill:#fff3e0
    classDef score fill:#e8f5e8
    classDef exclude fill:#ffebee

    class GET_USER,GET_HEALTH,GET_PREFS,GET_FOODS,CALC_SCORE,RANK,RETURN process
    class ALLERGY_CHECK,CHECK_ALLERGENS decision
    class POP_SCORE,HEALTH_SCORE,BMI_SCORE,DIFF_SCORE,TIME_SCORE,TOTAL_SCORE score
    class EXCLUDE exclude
```

#### Exercise Recommendation Scoring

```mermaid
flowchart TD
    START([Start Exercise Recommendation]) --> GET_USER[Get User Data]
    GET_USER --> GET_HEALTH[Get Health Data]
    GET_HEALTH --> GET_FITNESS[Get Fitness Preferences]
    GET_FITNESS --> GET_EXERCISES[Get Available Exercises]

    GET_EXERCISES --> CALC_SCORE[Calculate Score]

    CALC_SCORE --> POP_SCORE[Popularity Score: 0-20]
    POP_SCORE --> HEALTH_SCORE[Health Condition Score: 0-30]
    HEALTH_SCORE --> BMI_SCORE[BMI-Based Intensity Score: 0-25]
    BMI_SCORE --> DIFF_SCORE[Difficulty Score: 0-15]
    DIFF_SCORE --> CALORIE_SCORE[Calorie Burn Score: 0-10]

    CALORIE_SCORE --> TOTAL_SCORE[Total Score = Sum of All Scores]
    TOTAL_SCORE --> RANK[Rank by Score]
    RANK --> RETURN[Return Top N Recommendations]
    RETURN --> END([End])

    classDef process fill:#e3f2fd
    classDef score fill:#e8f5e8

    class GET_USER,GET_HEALTH,GET_FITNESS,GET_EXERCISES,CALC_SCORE,RANK,RETURN process
    class POP_SCORE,HEALTH_SCORE,BMI_SCORE,DIFF_SCORE,CALORIE_SCORE,TOTAL_SCORE score
```

### Health Condition Mapping

```mermaid
graph LR
    subgraph "Health Conditions"
        DIABETES[Diabetes]
        HYPERTENSION[Hypertension]
        HEART[Heart Disease]
        OBESITY[Obesity]
        ARTHRITIS[Arthritis]
    end

    subgraph "Food Recommendations"
        LOW_SUGAR[Low Sugar Foods]
        LOW_SODIUM[Low Sodium Foods]
        HEART_HEALTHY[Heart Healthy Foods]
        LOW_CALORIE[Low Calorie Foods]
        ANTI_INFLAMMATORY[Anti-inflammatory Foods]
    end

    subgraph "Exercise Recommendations"
        CARDIO[Cardio Exercises]
        LOW_IMPACT[Low Impact Exercises]
        STRENGTH[Strength Training]
        YOGA[Yoga/Stretching]
        SWIMMING[Swimming]
    end

    DIABETES --> LOW_SUGAR
    DIABETES --> CARDIO

    HYPERTENSION --> LOW_SODIUM
    HYPERTENSION --> CARDIO
    HYPERTENSION --> YOGA

    HEART --> HEART_HEALTHY
    HEART --> CARDIO

    OBESITY --> LOW_CALORIE
    OBESITY --> STRENGTH
    OBESITY --> CARDIO

    ARTHRITIS --> ANTI_INFLAMMATORY
    ARTHRITIS --> LOW_IMPACT
    ARTHRITIS --> SWIMMING

    classDef condition fill:#ffcdd2
    classDef food fill:#c8e6c9
    classDef exercise fill:#bbdefb

    class DIABETES,HYPERTENSION,HEART,OBESITY,ARTHRITIS condition
    class LOW_SUGAR,LOW_SODIUM,HEART_HEALTHY,LOW_CALORIE,ANTI_INFLAMMATORY food
    class CARDIO,LOW_IMPACT,STRENGTH,YOGA,SWIMMING exercise
```

## 🔄 Data Flow

### Complete Recommendation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as React UI
    participant API as API Service
    participant C as Controller
    participant S as Service
    participant Cache as Memory Cache
    participant R as Repository
    participant DB as Database

    Note over U,DB: Personalized Recommendation Request

    U->>UI: Open Homepage
    UI->>API: GET /recommendation/personalized/{userId}
    API->>C: HTTP Request

    C->>S: GetPersonalizedRecommendations(userId)

    Note over S,Cache: Check Cache First
    S->>Cache: Check cached recommendations

    alt Cache Hit
        Cache-->>S: Return cached data
    else Cache Miss
        Note over S,DB: Fetch Fresh Data

        par Fetch User Data
            S->>R: GetUserById(userId)
            R->>DB: SELECT user data
            DB-->>R: User data
            R-->>S: User object
        and Fetch Health Data
            S->>R: GetUserDetailById(userId)
            R->>DB: SELECT health data
            DB-->>R: Health data
            R-->>S: UserDetail object
        and Fetch Preferences
            S->>R: GetUserPreferences(userId)
            R->>DB: SELECT preferences
            DB-->>R: Preferences data
            R-->>S: UserPreference object
        and Fetch Content
            S->>R: GetApprovedFoods()
            R->>DB: SELECT approved foods
            DB-->>R: Foods list
            R-->>S: Food objects

            S->>R: GetApprovedExercises()
            R->>DB: SELECT approved exercises
            DB-->>R: Exercises list
            R-->>S: Exercise objects
        end

        Note over S: Apply Recommendation Algorithm

        loop For each Food
            S->>S: CalculateFoodScore(food, user, health)
            Note right of S: - Check allergies (exclude if match)<br/>- Calculate health condition score<br/>- Calculate BMI-based calorie score<br/>- Calculate difficulty score<br/>- Calculate cooking time score<br/>- Sum total score
        end

        loop For each Exercise
            S->>S: CalculateExerciseScore(exercise, user, health)
            Note right of S: - Calculate health condition score<br/>- Calculate BMI-based intensity score<br/>- Calculate difficulty score<br/>- Calculate calorie burn score<br/>- Sum total score
        end

        S->>S: RankAndFilterRecommendations()
        S->>Cache: Store recommendations (TTL: 30min)
    end

    S-->>C: PersonalizedRecommendationDTO
    C-->>API: JSON Response
    API-->>UI: Recommendation data

    Note over UI: Render Recommendations
    UI->>UI: Display RecommendationsSection
    UI->>UI: Render RecommendationCards
    UI-->>U: Show personalized recommendations

    Note over U,DB: User Feedback Flow

    U->>UI: Click "Like" on recommendation
    UI->>API: POST /recommendation/feedback
    API->>C: Feedback request
    C->>S: RecordFeedback(feedbackDTO)
    S->>R: Store feedback
    R->>DB: INSERT feedback
    DB-->>R: Success
    R-->>S: Feedback stored
    S->>Cache: Invalidate user cache
    S-->>C: Success response
    C-->>API: 200 OK
    API-->>UI: Success
    UI-->>U: Show feedback confirmation
```

### User Preference Management Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as React UI
    participant Modal as Preference Modal
    participant API as API Service
    participant C as Controller
    participant S as Service
    participant R as Repository
    participant DB as Database

    Note over U,DB: User Preference Setup

    U->>UI: Click "Settings" button
    UI->>Modal: Open UserPreferenceModal

    Modal->>API: GET /userpreference/{userId}
    API->>C: Get preferences request
    C->>R: GetUserPreferenceByUserId(userId)
    R->>DB: SELECT preferences

    alt Preferences Exist
        DB-->>R: Existing preferences
        R-->>C: UserPreference object
        C-->>API: Preference data
        API-->>Modal: Pre-fill form
    else No Preferences
        DB-->>R: No data found
        R-->>C: null
        C-->>API: 404 Not Found
        API-->>Modal: Empty form
    end

    Modal-->>U: Show preference form

    Note over U,Modal: User Updates Preferences

    U->>Modal: Fill/Update preferences
    U->>Modal: Click "Save"

    Modal->>Modal: Validate form data
    Modal->>Modal: Convert arrays to JSON

    Modal->>API: POST /userpreference
    API->>C: Create/Update request
    C->>S: CreateOrUpdateUserPreference(data)

    S->>R: GetUserPreferenceByUserId(userId)
    R->>DB: Check existing preferences

    alt Update Existing
        DB-->>R: Existing record
        R-->>S: UserPreference object
        S->>S: Update all fields
        S->>R: Save changes
        R->>DB: UPDATE preferences
    else Create New
        DB-->>R: No existing record
        R-->>S: null
        S->>S: Create new preference object
        S->>R: Create new record
        R->>DB: INSERT preferences
    end

    DB-->>R: Success
    R-->>S: Updated/Created object
    S-->>C: UserPreference DTO
    C-->>API: 200 OK + data
    API-->>Modal: Success response

    Modal->>Modal: Show success message
    Modal->>UI: Close modal
    Modal->>API: Trigger recommendation refresh

    Note over API: Clear recommendation cache
    API->>C: Refresh recommendations
    C->>S: Clear user cache
    S->>Cache: Invalidate cache entries

    UI-->>U: Updated preferences saved
```

## 📊 Performance Optimization Flow

````mermaid
flowchart TD
    REQUEST[Incoming Request] --> CACHE_CHECK{Check Cache}

    CACHE_CHECK -->|Hit| CACHE_RETURN[Return Cached Data]
    CACHE_CHECK -->|Miss| PARALLEL_FETCH[Parallel Data Fetching]

    PARALLEL_FETCH --> USER_FETCH[Fetch User Data]
    PARALLEL_FETCH --> HEALTH_FETCH[Fetch Health Data]
    PARALLEL_FETCH --> CONTENT_FETCH[Fetch Content Data]
    PARALLEL_FETCH --> PREF_FETCH[Fetch Preferences]

    USER_FETCH --> ALGORITHM[Apply Algorithm]
    HEALTH_FETCH --> ALGORITHM
    CONTENT_FETCH --> ALGORITHM
    PREF_FETCH --> ALGORITHM

    ALGORITHM --> SCORE_CALC[Calculate Scores]
    SCORE_CALC --> RANK[Rank Results]
    RANK --> CACHE_STORE[Store in Cache]
    CACHE_STORE --> RETURN[Return Results]

    CACHE_RETURN --> END[Response Sent]
    RETURN --> END

    classDef cache fill:#e1f5fe
    classDef process fill:#f3e5f5
    classDef data fill:#e8f5e8

    class CACHE_CHECK,CACHE_RETURN,CACHE_STORE cache
    class PARALLEL_FETCH,ALGORITHM,SCORE_CALC,RANK process
    class USER_FETCH,HEALTH_FETCH,CONTENT_FETCH,PREF_FETCH data

## 🔧 API Specifications

### Core Recommendation Endpoints

#### 1. Get Personalized Recommendations
```http
GET /api/Recommendation/personalized/{userId}?foodCount=5&exerciseCount=5
````

**Response Structure:**

```json
{
  "userId": 123,
  "username": "john_doe",
  "recommendedFoods": [
    {
      "foodId": 456,
      "foodName": "Grilled Salmon with Quinoa",
      "description": "Heart-healthy meal rich in omega-3",
      "imgUrl": "https://example.com/salmon.jpg",
      "calories": 320,
      "difficultyLevel": "medium",
      "healthBenefits": "Heart health, omega-3 fatty acids",
      "cookingTime": 25,
      "portion": 1,
      "recommendationScore": 87.5,
      "recommendationReason": "Good for heart health, matches your calorie goals",
      "foodTypes": ["seafood", "healthy"],
      "isLikedByUser": false
    }
  ],
  "recommendedExercises": [
    {
      "exerciseId": 789,
      "exerciseName": "Moderate Cardio Walk",
      "description": "30-minute brisk walking exercise",
      "difficultyLevel": "easy",
      "numberOfReps": null,
      "numberOfSets": null,
      "videoUrl": "https://example.com/walk.mp4",
      "imgUrl": "https://example.com/walking.jpg",
      "caloriesBurned": 150,
      "recommendationScore": 92.0,
      "recommendationReason": "Perfect for your fitness level and heart condition",
      "exerciseTypes": ["cardio"],
      "muscleTypes": ["legs", "core"],
      "isLikedByUser": true
    }
  ],
  "healthSummary": {
    "height": 175.0,
    "weight": 70.0,
    "bmi": 22.86,
    "healthCondition": "hypertension",
    "allergies": "shellfish",
    "activityLevel": "moderately_active",
    "targetCaloriesPerDay": 2200,
    "fitnessGoals": "heart_health"
  },
  "generatedAt": "2025-01-28T10:30:00Z"
}
```

#### 2. Record User Feedback

```http
POST /api/Recommendation/feedback
```

**Request Body:**

```json
{
  "userId": 123,
  "itemId": 456,
  "itemType": "food",
  "feedbackType": "like",
  "rating": 5,
  "comment": "Delicious and healthy!",
  "feedbackDate": "2025-01-28T10:30:00Z"
}
```

### Scoring Algorithm Details

#### Food Scoring Breakdown

```mermaid
pie title Food Recommendation Score Distribution
    "Health Condition Match" : 30
    "BMI-Based Calories" : 25
    "Popularity Score" : 20
    "Difficulty Preference" : 15
    "Cooking Time" : 10
```

#### Exercise Scoring Breakdown

```mermaid
pie title Exercise Recommendation Score Distribution
    "Health Condition Match" : 30
    "BMI-Based Intensity" : 25
    "Popularity Score" : 20
    "Difficulty Preference" : 15
    "Calorie Burn Efficiency" : 10
```

## 🎨 Frontend Components

### Component Hierarchy

```mermaid
graph TD
    HOME[Home Page] --> MAINBAR[HomeMainBar]
    MAINBAR --> RECS[RecommendationsSection]

    RECS --> TABS[Ant Design Tabs]
    TABS --> PERS_TAB[Personalized Tab]
    TABS --> TREND_TAB[Trending Tab]

    PERS_TAB --> HEALTH_SUMMARY[Health Summary Card]
    PERS_TAB --> FOOD_GRID[Food Recommendations Grid]
    PERS_TAB --> EX_GRID[Exercise Recommendations Grid]

    TREND_TAB --> TREND_FOOD[Trending Foods Grid]
    TREND_TAB --> TREND_EX[Trending Exercises Grid]

    FOOD_GRID --> FOOD_CARD[RecommendationCard - Food]
    EX_GRID --> EX_CARD[RecommendationCard - Exercise]
    TREND_FOOD --> FOOD_CARD
    TREND_EX --> EX_CARD

    RECS --> PREF_MODAL[UserPreferenceModal]

    classDef page fill:#e3f2fd
    classDef component fill:#f3e5f5
    classDef card fill:#e8f5e8
    classDef modal fill:#fff3e0

    class HOME page
    class MAINBAR,RECS,TABS,PERS_TAB,TREND_TAB,HEALTH_SUMMARY component
    class FOOD_GRID,EX_GRID,TREND_FOOD,TREND_EX,FOOD_CARD,EX_CARD card
    class PREF_MODAL modal
```

### State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> LoadingData: Fetch recommendations
    LoadingData --> Success: Data received
    LoadingData --> Error: API error

    Success --> DisplayingRecommendations
    DisplayingRecommendations --> RefreshingData: User clicks refresh
    DisplayingRecommendations --> RecordingFeedback: User likes/dislikes
    DisplayingRecommendations --> SettingPreferences: User opens settings

    RefreshingData --> LoadingData
    RecordingFeedback --> DisplayingRecommendations: Feedback recorded
    SettingPreferences --> SavingPreferences: User saves preferences
    SavingPreferences --> DisplayingRecommendations: Preferences saved

    Error --> Retry: User retries
    Retry --> LoadingData

    state DisplayingRecommendations {
        [*] --> PersonalizedTab
        PersonalizedTab --> TrendingTab: Switch tab
        TrendingTab --> PersonalizedTab: Switch tab
    }
```

## 💾 Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    Users ||--o| UserDetails : has
    Users ||--o| UserPreferences : has
    Users ||--o{ UserMealTrackings : tracks
    Users ||--o{ UserWorkoutTrackings : tracks
    Users ||--o{ Likes : gives
    Users ||--o{ Comments : makes

    Foods ||--o{ MealDetails : contains
    Foods ||--o{ Recipes : has
    Foods }o--o{ FoodTypes : categorized_by
    Foods ||--o{ Likes : receives
    Foods ||--o{ Comments : receives

    Exercises ||--o{ WorkoutDetails : contains
    Exercises }o--o{ ExerciseTypes : categorized_by
    Exercises }o--o{ MuscleTypes : targets
    Exercises ||--o{ Likes : receives
    Exercises ||--o{ Comments : receives

    MealSchedules ||--o{ MealDetails : contains
    MealSchedules ||--o{ UserMealSchedules : followed_by
    MealSchedules ||--o{ UserMealTrackings : tracked_by

    WorkoutSchedules ||--o{ WorkoutDetails : contains
    WorkoutSchedules ||--o{ UserWorkoutSchedules : followed_by
    WorkoutSchedules ||--o{ UserWorkoutTrackings : tracked_by

    Users {
        int UserID PK
        string Username
        string Email
        string Password
        string Avatar
        bool IsDeactivated
        bool IsAdmin
        string Provider
        datetime CreatedDate
    }

    UserDetails {
        int UserId PK,FK
        double Height
        double Weight
        string HealthCondition
        string Allergies
    }

    UserPreferences {
        int UserPreferenceId PK
        int UserId FK
        string DietaryRestrictions
        string PreferredCuisines
        string DislikedIngredients
        int MaxCookingTime
        string PreferredDifficultyLevel
        int TargetCaloriesPerMeal
        string PreferredExerciseTypes
        string PreferredMuscleGroups
        int MaxWorkoutDuration
        string FitnessGoals
        string PreferredWorkoutTime
        int FitnessLevel
        double TargetWeight
        int TargetCaloriesPerDay
        string HealthGoals
        string ActivityLevel
        datetime CreatedDate
        datetime UpdatedDate
    }

    Foods {
        int FoodId PK
        string FoodName
        string Description
        string ImgUrl
        string VideoUrl
        int Calories
        string DifficultyLevel
        string HealthBenefits
        int CookingTime
        int Portion
        int UploaderId FK
        bool IsApproved
        bool IsHidden
        int NumberOfLikes
        int NumberOfComments
        datetime CreatedDate
        datetime UpdatedDate
    }

    Exercises {
        int ExerciseId PK
        string ExerciseName
        string Description
        string DifficultyLevel
        int NumberOfReps
        int NumberOfSets
        string VideoUrl
        string ImgUrl
        int TimeBetweenSet
        int CaloriesBurned
        bool IsApproved
        bool IsHidden
        int UploaderId FK
        int NumberOfLikes
        int NumberOfComments
        datetime CreatedDate
        datetime UpdatedDate
    }
```

## ⚡ Performance Optimization

### Caching Strategy

```mermaid
graph LR
    subgraph "Cache Layers"
        L1[Memory Cache - L1]
        L2[Redis Cache - L2]
        L3[Database - L3]
    end

    subgraph "Cache Keys"
        USER_REC[user_recommendations_{userId}]
        HEALTH_SUM[health_summary_{userId}]
        TRENDING[trending_content]
        USER_PREF[user_preferences_{userId}]
    end

    subgraph "TTL Settings"
        TTL_30[30 minutes]
        TTL_60[1 hour]
        TTL_120[2 hours]
        TTL_1440[24 hours]
    end

    USER_REC --> TTL_30
    HEALTH_SUM --> TTL_60
    TRENDING --> TTL_120
    USER_PREF --> TTL_1440

    L1 --> L2
    L2 --> L3

    classDef cache fill:#e1f5fe
    classDef key fill:#f3e5f5
    classDef ttl fill:#e8f5e8

    class L1,L2,L3 cache
    class USER_REC,HEALTH_SUM,TRENDING,USER_PREF key
    class TTL_30,TTL_60,TTL_120,TTL_1440 ttl
```

### Performance Metrics

```mermaid
graph TD
    subgraph "Performance Targets"
        API_RESPONSE[API Response < 500ms]
        CACHE_HIT[Cache Hit Rate > 80%]
        DB_QUERY[DB Query < 100ms]
        UI_RENDER[UI Render < 200ms]
    end

    subgraph "Optimization Techniques"
        PARALLEL[Parallel Data Fetching]
        INDEXING[Database Indexing]
        COMPRESSION[Response Compression]
        LAZY_LOAD[Lazy Loading]
    end

    subgraph "Monitoring"
        METRICS[Performance Metrics]
        ALERTS[Performance Alerts]
        LOGGING[Request Logging]
    end

    PARALLEL --> API_RESPONSE
    INDEXING --> DB_QUERY
    COMPRESSION --> API_RESPONSE
    LAZY_LOAD --> UI_RENDER

    API_RESPONSE --> METRICS
    CACHE_HIT --> METRICS
    DB_QUERY --> METRICS
    UI_RENDER --> METRICS

    METRICS --> ALERTS
    METRICS --> LOGGING

    classDef target fill:#c8e6c9
    classDef optimization fill:#bbdefb
    classDef monitoring fill:#ffcdd2

    class API_RESPONSE,CACHE_HIT,DB_QUERY,UI_RENDER target
    class PARALLEL,INDEXING,COMPRESSION,LAZY_LOAD optimization
    class METRICS,ALERTS,LOGGING monitoring
```

## 🔮 Future Enhancements

### Machine Learning Integration Roadmap

```mermaid
timeline
    title ML Integration Roadmap

    section Phase 1 : Data Collection
        Collect User Interactions    : User clicks, likes, time spent
        Behavioral Patterns         : Usage patterns, preferences
        Feedback Analysis           : Rating analysis, comment sentiment

    section Phase 2 : Basic ML
        Collaborative Filtering     : User-based recommendations
        Content Similarity          : Item-based recommendations
        Clustering                  : User segmentation

    section Phase 3 : Advanced ML
        Deep Learning              : Neural networks for recommendations
        Real-time Learning         : Online learning algorithms
        A/B Testing               : Algorithm performance comparison

    section Phase 4 : AI Integration
        Natural Language Processing : Recipe and exercise understanding
        Computer Vision            : Image-based food recognition
        Predictive Analytics       : Health outcome prediction
```

### Scalability Architecture

```mermaid
graph TB
    subgraph "Load Balancer"
        LB[Load Balancer]
    end

    subgraph "API Gateway"
        GATEWAY[API Gateway]
    end

    subgraph "Microservices"
        REC_SERVICE[Recommendation Service]
        USER_SERVICE[User Service]
        CONTENT_SERVICE[Content Service]
        ML_SERVICE[ML Service]
    end

    subgraph "Data Layer"
        REDIS[(Redis Cache)]
        POSTGRES[(PostgreSQL)]
        MONGO[(MongoDB)]
        ELASTIC[(Elasticsearch)]
    end

    subgraph "Message Queue"
        KAFKA[Apache Kafka]
    end

    LB --> GATEWAY
    GATEWAY --> REC_SERVICE
    GATEWAY --> USER_SERVICE
    GATEWAY --> CONTENT_SERVICE
    GATEWAY --> ML_SERVICE

    REC_SERVICE --> REDIS
    REC_SERVICE --> POSTGRES
    USER_SERVICE --> POSTGRES
    CONTENT_SERVICE --> MONGO
    ML_SERVICE --> ELASTIC

    REC_SERVICE --> KAFKA
    ML_SERVICE --> KAFKA

    classDef gateway fill:#e1f5fe
    classDef service fill:#f3e5f5
    classDef data fill:#e8f5e8
    classDef queue fill:#fff3e0

    class LB,GATEWAY gateway
    class REC_SERVICE,USER_SERVICE,CONTENT_SERVICE,ML_SERVICE service
    class REDIS,POSTGRES,MONGO,ELASTIC data
    class KAFKA queue
```

---

## 📝 Conclusion

HealthBuddy Recommendation System là một giải pháp toàn diện, được thiết kế với:

- **Intelligent Algorithms**: Multi-factor scoring với health-first approach
- **Scalable Architecture**: Microservices-ready với caching optimization
- **User-Centric Design**: Responsive UI với comprehensive preference management
- **Safety Features**: Allergy filtering và health condition consideration
- **Performance Optimized**: Sub-500ms response times với intelligent caching

Hệ thống đã sẵn sàng cho production và có thể scale để phục vụ hàng nghìn users đồng thời, đồng thời cung cấp foundation vững chắc cho việc tích hợp Machine Learning trong tương lai.

**Status**: ✅ **PRODUCTION READY**

```

```
