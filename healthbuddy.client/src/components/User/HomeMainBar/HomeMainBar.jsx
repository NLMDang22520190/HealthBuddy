import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modal } from "antd";

import PostList from "../PostList/PostList";
import UserAddNewPost from "../UserAddNewPost/UserAddNewPost";
import AddNewNavigateModal from "../AddNewNavigateModal/AddNewNavigateModal";

const posts = [
  {
    id: 1,
    title: "10 mẹo chăm sóc sức khỏe mỗi ngày",
    content:
      "Cùng khám phá những thói quen đơn giản nhưng giúp bạn cải thiện sức khỏe hàng ngày.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 120,
    numberOfComments: 45,
    postDate: "2023-12-01",
  },
  {
    id: 2,
    title: "Lợi ích của việc tập yoga mỗi sáng",
    content:
      "Tập yoga buổi sáng không chỉ giúp thư giãn mà còn cải thiện sức khỏe tinh thần và thể chất.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 2,
      name: "Lê Thị Bích",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 95,
    numberOfComments: 30,
    postDate: "2023-11-30",
  },
  {
    id: 3,
    title: "Ăn uống lành mạnh với chế độ thực phẩm hữu cơ",
    content:
      "Thực phẩm hữu cơ ngày càng phổ biến. Hãy xem lợi ích của chúng đối với sức khỏe của bạn.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 3,
      name: "Trần Minh Khoa",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 85,
    numberOfComments: 20,
    postDate: "2023-11-29",
  },
  {
    id: 4,
    title: "Làm thế nào để duy trì giấc ngủ sâu?",
    content:
      "Giấc ngủ sâu rất quan trọng. Hãy học cách cải thiện chất lượng giấc ngủ của bạn qua các mẹo sau.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 4,
      name: "Hoàng Phương Linh",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 110,
    numberOfComments: 25,
    postDate: "2023-11-28",
  },
  {
    id: 5,
    title: "Tác dụng của việc uống nước đúng cách",
    content:
      "Uống nước không chỉ để giải khát, mà còn giúp cơ thể hoạt động tốt hơn. Bạn đã uống nước đúng cách chưa?",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 5,
      name: "Phạm Thanh Hòa",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 78,
    numberOfComments: 18,
    postDate: "2023-11-27",
  },
  {
    id: 6,
    title: "Bí quyết giảm căng thẳng trong công việc",
    content:
      "Công việc căng thẳng? Những cách này sẽ giúp bạn lấy lại sự cân bằng và thư giãn.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 6,
      name: "Đặng Quốc Anh",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 65,
    numberOfComments: 22,
    postDate: "2023-11-26",
  },
  {
    id: 7,
    title: "Tập thể dục ngoài trời: Những lợi ích bất ngờ",
    content:
      "Tập thể dục ngoài trời không chỉ tốt cho sức khỏe mà còn mang lại sự thư giãn tinh thần.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 7,
      name: "Ngô Hải Nam",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 140,
    numberOfComments: 50,
    postDate: "2023-11-25",
  },
  {
    id: 8,
    title: "Thực đơn ăn kiêng khoa học cho người bận rộn",
    content:
      "Không cần mất nhiều thời gian, bạn vẫn có thể ăn kiêng khoa học với thực đơn này.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 8,
      name: "Võ Nhật Minh",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 88,
    numberOfComments: 35,
    postDate: "2023-11-24",
  },
  {
    id: 9,
    title: "Hướng dẫn thở đúng cách để giảm stress",
    content:
      "Kỹ thuật thở có thể giúp bạn giảm căng thẳng ngay lập tức. Hãy thử những cách sau.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 9,
      name: "Nguyễn Quang Dũng",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 102,
    numberOfComments: 40,
    postDate: "2023-11-23",
  },
  {
    id: 10,
    title: "5 bài tập thể dục tại nhà đơn giản",
    content:
      "Không cần đến phòng gym, bạn vẫn có thể tập luyện hiệu quả với 5 bài tập này.Không cần đến phòng gym, bạn vẫn có thể tập luyện hiệu quả với 5 bài tập này.Không cần đến phòng gym, bạn vẫn có thể tập luyện hiệu quả với 5 bài tập này.Không cần đến phòng gym, bạn vẫn có thể tập luyện hiệu quả với 5 bài tập này.",
    image: "https://placehold.co/50x50.png",
    user: {
      id: 10,
      name: "Trần Thị Mỹ Duyên",
      avatar: "https://placehold.co/50x50.png",
    },
    numberOfLikes: 125,
    numberOfComments: 60,
    postDate: "2023-11-22",
  },
];

const HomeMainBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddClick = () => {
    setIsOpen(true);
    //navigate("/add/new-food");
  };

  return (
    <div className="h-screen overflow-y-auto">
      {/* Content bên trong scroll */}
      <div className="min-h-screen divide-gray-400 divide-y">
        <UserAddNewPost onAddClick={handleAddClick} />
        <PostList posts={posts} />
      </div>
      <AddNewNavigateModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      ></AddNewNavigateModal>
    </div>
  );
};

export default HomeMainBar;
