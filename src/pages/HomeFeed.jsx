import { useEffect } from "react";
import { feedUsers } from "../api/feedApi";
import { useDispatch, useSelector } from "react-redux";
import { displayFeed, removeFeed } from "../features/feed/feedSlice";
import Card from "../components/Card";

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

  const handleSwipe = (userId, direction) => {
    console.log(direction === "right" ? "Liked:" : "Passed:", userId);

    dispatch(removeFeed(userId));
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
    <div className="flex min-h-[80vh] items-center justify-center px-4">
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
