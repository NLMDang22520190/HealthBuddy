# Recommendation Card Navigation Enhancement

## Task Overview
Chỉnh sửa RecommendationCard component để khi click sẽ navigate tới trang detail của food/exercise.

## Analysis Results

### ✅ API Response Structure
- **FoodRecommendationDTO** có `FoodId` (line 5 trong RecommendationDTO.cs)
- **ExerciseRecommendationDTO** có `ExerciseId` (line 22 trong RecommendationDTO.cs)
- API trả về đầy đủ thông tin ID và có thể xác định loại thông qua `type` parameter

### ✅ Routing Structure
- Food detail: `/detail/food/:postId`
- Exercise detail: `/detail/exercise/:postId`
- Routes đã được định nghĩa trong AllUserRoutes.jsx

## Implementation Plan

### ✅ Changes Made
1. **Added useNavigate import** - Import React Router's useNavigate hook
2. **Added handleCardClick function** - Navigate to detail page based on type and ID
3. **Added onClick to Card components** - Both food and exercise cards
4. **Added cursor-pointer class** - Visual feedback for clickable cards
5. **Updated handleFeedback function** - Added event.stopPropagation() to prevent card click
6. **Updated action button onClick handlers** - Pass event parameter to prevent bubbling

### ✅ Code Changes

#### File: `healthbuddy.client/src/components/User/RecommendationCard/RecommendationCard.jsx`

**Imports:**
```javascript
import { useNavigate } from "react-router-dom";
```

**New Functions:**
```javascript
const navigate = useNavigate();

const handleCardClick = () => {
  const itemId = recommendation[type === "food" ? "foodId" : "exerciseId"];
  const detailPath = `/detail/${type}/${itemId}`;
  navigate(detailPath);
};
```

**Updated Functions:**
```javascript
const handleFeedback = async (feedbackType, event) => {
  // Prevent card click when clicking action buttons
  event.stopPropagation();
  // ... rest of function
};
```

**Updated JSX:**
```javascript
// Food Card
<Card 
  className="... cursor-pointer"
  onClick={handleCardClick}
>

// Exercise Card  
<Card 
  className="... cursor-pointer"
  onClick={handleCardClick}
>

// Action Buttons
onClick={(e) => handleFeedback("like", e)}
onClick={(e) => handleFeedback("not_interested", e)}
```

## Testing Results

### ✅ Build Status
- **Build successful** ✅
- **No TypeScript/ESLint errors** ✅
- **No runtime errors detected** ✅

## Expected Behavior

### ✅ User Experience
1. **Card Click**: Clicking anywhere on recommendation card navigates to detail page
2. **Action Buttons**: Like/Not Interested buttons work independently without triggering navigation
3. **Visual Feedback**: Cursor changes to pointer on hover
4. **Proper Navigation**: 
   - Food recommendations → `/detail/food/{foodId}`
   - Exercise recommendations → `/detail/exercise/{exerciseId}`

## Technical Notes

### ✅ Event Handling
- Used `event.stopPropagation()` to prevent action button clicks from triggering card navigation
- Maintained existing feedback functionality while adding navigation
- Preserved all existing styling and animations

### ✅ Type Safety
- Properly handles both food and exercise types
- Uses conditional property access for ID fields
- Maintains backward compatibility

## Status: ✅ COMPLETED

All requirements have been successfully implemented:
- ✅ API returns ID and type information
- ✅ Navigation functionality added to recommendation cards
- ✅ Action buttons work independently
- ✅ Build passes without errors
- ✅ Code follows existing patterns and conventions
