import React, { useState } from "react";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { Accordion, Label } from "flowbite-react";

import UserComment from "../UserComment/UserComment";
import InteractButton from "../InteractButton/InteractButton";

const comments = [
  {
    id: 1,
    user: {
      id: 1,
      name: "John Doe",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "Great post!",
    commentDate: "2023-12-01",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Jane Smith",
      avatar: "https://placehold.co/50x50.png",
    },
    content:
      "I love this recipe, thanks for sharing! I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!I love this recipe, thanks for sharing!",
    commentDate: "2023-12-02",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Robert Johnson",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "Very informative, I’ll try it soon!",
    commentDate: "2023-12-03",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Emily Davis",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "This looks so delicious!",
    commentDate: "2023-12-04",
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "Michael Brown",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "Can’t wait to make this for dinner!",
    commentDate: "2023-12-05",
  },
  {
    id: 6,
    user: {
      id: 6,
      name: "Sophia Martinez",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "This is so helpful, thank you!",
    commentDate: "2023-12-06",
  },
  {
    id: 7,
    user: {
      id: 7,
      name: "William Wilson",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "I’ve been looking for a recipe like this!",
    commentDate: "2023-12-07",
  },
  {
    id: 8,
    user: {
      id: 8,
      name: "Olivia Moore",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "Tried it yesterday, it was amazing!",
    commentDate: "2023-12-08",
  },
  {
    id: 9,
    user: {
      id: 9,
      name: "James Taylor",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "Thanks for sharing this recipe.",
    commentDate: "2023-12-09",
  },
  {
    id: 10,
    user: {
      id: 10,
      name: "Charlotte Anderson",
      avatar: "https://placehold.co/50x50.png",
    },
    content: "Looks simple and delicious. Can’t wait to try!",
    commentDate: "2023-12-10",
  },
];

const CommentCard = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col border rounded-lg mb-6 dark:border-bg_divide_dark border-bg_divide_light">
      <InteractButton
        liked={liked}
        onLikeClick={() => setLiked(!liked)}
      ></InteractButton>
      <Accordion className="flex-1 dark:border-transparent border-transparent">
        <Accordion.Panel>
          <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg hover:bg-transparent focus:bg-transparent  dark:hover:bg-transparent dark:bg-transparent">
            <Label className="text-xl font-semibold mb-2">Comments</Label>
          </Accordion.Title>
          <Accordion.Content className="bg-transparent dark:bg-transparent divide-y dark:divide-bg_divide_dark divide-bg_divide_light p-0">
            {comments.map((comment) => (
              <UserComment comment={comment} />
            ))}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default CommentCard;
