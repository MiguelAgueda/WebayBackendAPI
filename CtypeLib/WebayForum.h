#pragma once

#ifndef WEBAYFORUM_H_
#define WEBAYFORUM_H_

#include <string>
#include <vector>
#include <memory>

struct ForumPostNode;

//both typedef and using cause new to create an overload error upon constructing new objects

// shared pointers are used instead of unique pointers to be able to return them withfindReply()
struct ForumPostNode
{
	std::string postUser;
	std::string postContent;
	std::vector<std::shared_ptr<ForumPostNode>> replies;
};

struct ForumOP : public ForumPostNode
{
	std::string postTitle;
};

class WebayForumData
{
	// Perhaps change all functions that check if memory is full to from void to bool or int to return if it was successful
	public:
		void addOppost(const std::string&, const std::string&, const std::string&);
		void addReplyPost(const int&, const int[], const std::string&, const std::string&);

		void deleteOpPost(const int&);
		void deleteReplyPost(const int&, const int[]);

		void modifyOpPost(const int&, const std::string&);
		void modifyReplyPost(const int&, const int[], const std::string&);

		void searchPostTitle(const std::string&);
		std::string returnPostContent(const int&, const int[]);

		void reserveListSpace();
		void destroyData();

		std::shared_ptr<ForumPostNode> findReply(const int&, const int[]);

	private:
		std::vector<std::unique_ptr<ForumOP>> forumOpList;
		std::vector<int> deletedOp;
		bool full();
};


#endif /*WEBAYFORUM_H_*/
