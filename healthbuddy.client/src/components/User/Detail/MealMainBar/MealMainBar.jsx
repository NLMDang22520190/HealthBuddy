import React from "react";
import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Image, message } from "antd";
import { useParams } from "react-router-dom";
import { Accordion, Label, Spinner, Button } from "flowbite-react";
import { Flag, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../../../../features/AxiosInstance/AxiosInstance";
import DescriptionCard from "../DescriptionCard/DescriptionCard";
import CommentCard from "../CommentCard/CommentCard";
import CommentAccordition from "../CommentAccordition/CommentAccordition";
import ShowImageModal from "../../../ShowImageModal/ShowImageModal";
import FollowMealScheduleModal from "../FollowMealScheduleModal/FollowMealScheduleModal";

const MealMainBar = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFollowModal, setShowFollowModal] = useState(false);

  const [scheduleDetail, setScheduleDetail] = useState(null);
  const [isDataLoading, startDataTransition] = useTransition();
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const [commentAdded, setCommentAdded] = useState(false);

  const handleCommentAdded = () => {
    setCommentAdded((prev) => !prev);
  };

  const handleDetailClick = (detail) => {
    console.log(detail);
    navigate(`/detail/food/${detail.foodId}`);
  };

  const handleFollowClick = () => {
    if (!userId) {
      message.error("Please login to follow meal schedule");
      return;
    }
    setShowFollowModal(true);
  };

  const handleFollowSchedule = async (startDate) => {
    try {
      setIsFollowLoading(true);

      const requestData = {
        userId: parseInt(userId),
        mealScheduleId: parseInt(postId),
        startDate: startDate,
        trackingDate: startDate
      };

      const response = await api.post("/api/Meal/FollowMealSchedule", requestData);

      message.success(`Successfully followed meal schedule! ${response.data.totalDays} days tracking created.`);
      setShowFollowModal(false);
    } catch (error) {
      console.error("Error following meal schedule:", error);
      message.error("Failed to follow meal schedule: " + (error.response?.data?.detail || error.message));
    } finally {
      setIsFollowLoading(false);
    }
  };

  const fetchScheduleDetail = async () => {
    try {
      const response = await api.get("/api/Meal/GetMealScheduleById/" + postId);
      const mappedDetail = {
        id: response.data.mealScheduleId,
        title: response.data.mealName,
        image: response.data.imgUrl,
        description: response.data.description,
        totalDays: response.data.totalDays,
        details: response.data.mealDetails.map((detail) => ({
          foodId: detail.food.foodId,
          exerciseName: detail.food.foodName,
          detailImg: detail.food.imgUrl,
          day: detail.dayNumber,
          mealTime: detail.mealTime,
        })),
        numberOfLikes: response.data.numberOfLikes,
        numberOfComments: response.data.numberOfComments,
      };
      console.log(mappedDetail);
      setScheduleDetail(mappedDetail);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch schedule detail" + error.message);
    }
  };

  useEffect(() => {
    startDataTransition(async () => {
      await fetchScheduleDetail();
    });
  }, []);

  if (isDataLoading || !scheduleDetail) {
    return (
      <div className="flex h-full justify-center items-center">
        <Spinner size="xl" color="info" />
      </div>
    );
  }

  return (
    <div className="user-page-mainbar-content-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col p-3 md:p-6 user-page-mainbar-content-marginbottom"
      >
        {/* Main image */}
        <motion.img
          onClick={() => setShowImageModal(true)}
          src={scheduleDetail.image}
          alt="Scedule"
          className="cursor-pointer w-full h-64 object-cover rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Title and actions */}
        <div className="flex justify-between items-center mb-6">
          <Label className="text-3xl font-bold">{scheduleDetail.title}</Label>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleFollowClick}
              className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              size="sm"
            >
              <Heart className="size-4 mr-2" />
              Follow
            </Button>
            <button className="text-primary-light dark:text-primary-dark">
              <Flag className="size-7" />
            </button>
          </div>
        </div>

        {/* Food Types */}
        <div className="mb-6 flex gap-2">
          <Label className="text-xl font-semibold">Total Days:</Label>

          <span className="bg-primary-light dark:bg-primary-dark text-white py-1 flex justify-center items-center px-2 rounded-full">
            {scheduleDetail.totalDays} Days
          </span>
        </div>

        <Accordion className="mb-6 dark:border-bg_divide_dark border-bg_divide_light">
          <Accordion.Panel>
            <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg dark:hover:bg-primary-light dark:bg-primary-900">
              <Label className="text-xl font-semibold mb-2">
                Schedule Info
              </Label>
            </Accordion.Title>
            <Accordion.Content className="bg-transparent dark:bg-transparent ">
              {/* Description */}
              <DescriptionCard
                title="Description"
                description={scheduleDetail.description}
              />

              {/* Details */}
              <Accordion className="mb-6 dark:border-bg_divide_dark border-bg_divide_light">
                <Accordion.Panel>
                  <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg dark:hover:bg-primary-light dark:bg-primary-900">
                    <Label className="text-xl font-semibold mb-2">
                      Schedule Details
                    </Label>
                  </Accordion.Title>
                  <Accordion.Content className="bg-transparent dark:bg-transparent ">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {scheduleDetail.details.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <Label>
                            {" "}
                            {`Day ${detail.day} - ${detail.mealTime}`}
                          </Label>
                          <Label
                            onClick={() => handleDetailClick(detail)}
                            className="dark:hover:text-primary-dark hover:text-primary-light cursor-pointer"
                          >
                            {detail.exerciseName}
                          </Label>
                          <Image
                            width={100}
                            height={50}
                            src={detail.detailImg}
                          ></Image>
                        </div>
                      ))}
                    </motion.div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>

        <CommentCard
          numberOfLikes={scheduleDetail.numberOfLikes}
          numberOfComments={scheduleDetail.numberOfComments}
          postType="meal"
          postId={postId}
          onCommentAdded={commentAdded}
        ></CommentCard>
      </motion.div>

      <CommentAccordition
        postType="meal"
        postId={postId}
        onCommentAdded={handleCommentAdded}
      ></CommentAccordition>
      <ShowImageModal
        image={scheduleDetail.image}
        show={showImageModal}
        onCancel={() => setShowImageModal(false)}
      ></ShowImageModal>

      <FollowMealScheduleModal
        open={showFollowModal}
        onCancel={() => setShowFollowModal(false)}
        onFollow={handleFollowSchedule}
        isLoading={isFollowLoading}
        mealScheduleName={scheduleDetail?.title || "Meal Schedule"}
      />
    </div>
  );
};

export default MealMainBar;
