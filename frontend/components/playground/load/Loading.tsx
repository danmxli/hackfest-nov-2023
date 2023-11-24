import { motion } from "framer-motion";

const colors = ["#5eead4", "#134e4a", "#0f766e", "#99f6e4", "#14b8a6"];

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const dotVariants = {
    initial: {},
    animate: {
        height: [40, 100, 40],
        transition: {
            repeat: Infinity
        }
    }
};

const Loading = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 0.15,
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
            }}
            className="h-screen flex items-center justify-center">
            <motion.div

                variants={containerVariants}
                initial="initial"
                animate="animate"
                style={{
                    display: "flex",
                    gap: 16,
                    height: 100,
                    alignItems: "center"
                }}
            >
                {Array(5)
                    .fill(null)
                    .map((_, index) => {
                        return (
                            <motion.div
                                key={index}
                                variants={dotVariants}
                                style={{
                                    height: 40,
                                    width: 40,
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: 20
                                }}
                            />
                        );
                    })}
            </motion.div>
            <div className="m-4 w-72">
                <div className="p-4 m-4 bg-teal-800 text-teal-100 rounded-3xl">
                    Loading...
                </div>
                <div className="p-4 m-4 border border-2 border-teal-600 rounded-3xl">
                    <h1 className="italic">The base plan serves as the stem from which your ideas sprout.</h1>
                </div>
                <div className="p-4 m-4 border border-2 border-teal-600 rounded-3xl">
                    <h1 className="italic">Subtasks can be added to each node of the stem to alleviate the complexity of each task.</h1>
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;
