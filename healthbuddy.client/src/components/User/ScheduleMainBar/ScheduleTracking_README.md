# ScheduleTracking Component

## Overview
ScheduleTracking component hiển thị các meal và workout schedules mà user đang theo dõi (tracking). Component này có giao diện giống như AllSchedule nhưng chỉ hiển thị schedules mà user đã follow.

## Features

### 🔐 **Authentication Check**
- Kiểm tra user đã login chưa
- Hiển thị thông báo nếu chưa login

### 📊 **API Integration**
- Call API: `GET /api/Schedule/GetUserTrackingSchedules/{userId}`
- Lấy danh sách schedules mà user đang tracking
- Map data từ API response sang format component

### 🎨 **UI Components**
- **Search Bar**: Tìm kiếm trong tracking schedules
- **Sort & Filter**: Sắp xếp và lọc theo loại (Meal/Workout)
- **Schedule List**: Hiển thị danh sách schedules
- **Empty State**: Hiển thị khi chưa có schedules nào

### 🔍 **Search & Filter**
- **Search**: Tìm kiếm theo title và description
- **Filter**: Lọc theo type (Meal/Workout)
- **Sort**: Sắp xếp theo Most Recent, Most Likes, Most Comments

### 📱 **Responsive Design**
- Mobile-friendly layout
- Smooth animations với Framer Motion
- Dark/Light theme support

## Component Structure

```jsx
ScheduleTracking
├── Authentication Check
├── Loading State (Spinner)
├── Empty State (No schedules)
└── Main Content
    ├── Search Bar
    ├── Sort & Filter Bar
    └── Schedule Post List
```

## States

```jsx
const [searchQuery, setSearchQuery] = useState("");
const [activeSort, setActiveSort] = useState("all");
const [selectedFilters, setSelectedFilters] = useState([]);
const [trackingSchedules, setTrackingSchedules] = useState([]);
const [isDataFetching, startTransition] = useTransition();
```

## API Data Mapping

```jsx
const mappedData = response.data.map((item) => ({
  id: item.postId,
  title: item.title,
  content: item.description,
  image: item.imgUrl,
  user: {
    id: item.uploader.userId,
    name: item.uploader.username,
    avatar: item.uploader.avatar || "https://placehold.co/50x50.png",
  },
  numberOfLikes: item.numberOfLikes,
  numberOfComments: item.numberOfComments,
  postDate: item.createdDate,
  type: item.postType.toUpperCase(),
  totalDays: item.totalDays,
}));
```

## Empty State Design

- **Icon**: Heart icon để thể hiện "following"
- **Title**: "No Tracking Schedules Yet"
- **Description**: Hướng dẫn user follow schedules
- **Call-to-action**: Khuyến khích explore schedules

## Usage

```jsx
import ScheduleTracking from './ScheduleTracking';

// In parent component
<ScheduleTracking type="tracking" />
```

## Dependencies

- React hooks (useState, useEffect, useTransition)
- Redux (useSelector for userId)
- Framer Motion (animations)
- Flowbite React (UI components)
- Antd (message notifications)
- Lucide React (icons)

## Error Handling

- Network errors: Show error message
- No user: Show login prompt
- Empty data: Show empty state
- Loading: Show spinner
