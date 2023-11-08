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

const Loading = ({ count = 5 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 0.15,
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
            }}
            className="h-screen w-screen grid items-center justify-center">
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
                {Array(count)
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
        </motion.div>

    );
};

export default Loading;
