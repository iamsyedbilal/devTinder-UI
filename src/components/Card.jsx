import { motion, useMotionValue, useTransform } from "framer-motion";

function Card({ user, isTop, onSwipe }) {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const likeOpacity = useTransform(x, [0, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, 0], [1, 0]);

  const isNewUser = () => {
    if (!user?.createdAt) return false;

    const createdDate = new Date(user.createdAt);
    const now = new Date();

    const daysDifference = (now - createdDate) / (1000 * 60 * 60 * 24);

    return daysDifference < 3;
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 120) {
      onSwipe(user._id, "right");
    } else if (info.offset.x < -120) {
      onSwipe(user._id, "left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        zIndex: isTop ? 10 : 1,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileTap={isTop ? { cursor: "grabbing" } : undefined}
    >
      <div className="card h-130 w-full overflow-hidden rounded-3xl bg-base-100 shadow-2xl">
        {/* Image */}
        <figure className="relative h-[60%] shrink-0">
          <img
            src={user?.profileImage || "https://i.pravatar.cc/300?img=12"}
            alt={`${user?.firstName || "User"} profile picture`}
            className="h-full w-full object-cover"
          />

          {/* Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/80 to-transparent" />

          {/* LIKE */}
          {isTop && (
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute right-5 top-5 rotate-12 rounded-xl border-4 border-green-400 px-3 py-1 text-xl font-black text-green-400"
            >
              LIKE
            </motion.div>
          )}

          {/* NOPE */}
          {isTop && (
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute left-5 top-5 -rotate-12 rounded-xl border-4 border-red-400 px-3 py-1 text-xl font-black text-red-400"
            >
              NOPE
            </motion.div>
          )}

          {/* User info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h2>

              {isNewUser() && (
                <span className="badge badge-secondary">New</span>
              )}
            </div>

            <p className="mt-1 text-sm opacity-90">
              {user?.age} • {user?.gender}
            </p>
          </div>
        </figure>

        {/* Content */}
        <div className="card-body flex-1 gap-2 p-4">
          <p className="line-clamp-2 text-sm opacity-80">
            {user?.about || "No information available."}
          </p>

          <div className="flex flex-wrap gap-2">
            {user?.skills?.map((skill) => (
              <span key={skill} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
