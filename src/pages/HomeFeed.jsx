import { useEffect } from "react";
import { feedUsers, sendConnectionRequest } from "../api/feedApi";
import { useDispatch, useSelector } from "react-redux";
import { displayFeed, removeFeed } from "../features/feed/feedSlice";
import Card from "../components/Card";
import toast from "react-hot-toast";

function HomeFeed() {
  const feed = useSelector((store) => store.feed.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    if (feed.length > 0) return;

    async function getFeed() {
      try {
        const response = await feedUsers();

        dispatch(displayFeed(response?.data?.data || []));
      } catch (error) {
        console.log(error);
      }
    }

    getFeed();
  }, [dispatch, feed.length]);

  const handleSwipe = async (userId, direction) => {
    try {
      const status = direction === "right" ? "interested" : "ignore";
      await sendConnectionRequest(status, userId);
      dispatch(removeFeed(userId));

      if (direction === "right") {
        toast.success("Connection request sent");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    }
  };

  if (feed.length === 0) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No more profiles</h2>
          <p className="mt-2 opacity-60">
            Check back later for new developers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="z-20 flex min-h-[80vh] items-center justify-center px-4">
      <div className="relative h-150 w-full max-w-sm">
        {feed
          .slice(0, 2)
          .reverse()
          .map((user, index) => (
            <Card
              key={user._id}
              user={user}
              isTop={index === 1}
              onSwipe={handleSwipe}
            />
          ))}
      </div>
    </div>
  );
}

export default HomeFeed;
