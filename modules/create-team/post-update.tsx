import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CreateTeamMutation } from "../gql-gen/generated/apollo-graphql";

interface PostUpdateProps {
  data: CreateTeamMutation | undefined;
  isVisible: boolean;
}

export const PostUpdate: React.FC<PostUpdateProps> = ({ data, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {data && data.createTeam ? data.createTeam.name : ""}
      </motion.div>
    )}
  </AnimatePresence>
);
