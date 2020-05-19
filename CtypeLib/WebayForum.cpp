#include "WebayForum.h"
#include <vector>
#include <string>
#include <memory>

void WebayForumData::addOpPost(const std::string& title, const std::string& user, const std::string& content)
{
	if (!full)
	{
		// Typedefs don't work for unique pointers for no reason
		// Create new op post object
		std::unique_ptr<ForumOP> newOPPost(new ForumOP);
		newOPPost->postTitle = title;
		newOPPost->postContent = content;

		// If no op posts have been deleted, simply push to vector, else find an empty place in vector
		if (deletedOp.empty())
		{
			// Reserve more space when vector is full
			if (forumOpList.size() == forumOpList.reserve)
				reserveListSpace();
			
			forumOpList.push_back(std::move(newOPPost));
		}
		else
		{
			forumOpList[deletedOp.back()] = std::move(newOPPost);
			deletedOp.erase(deletedOp.begin() + deletedOp.size() - 1);
		}
	}
} // end addOpPost

void WebayForumData::addReplyPost(const int& OpId, const int ReplyId[], const std::string& user, const std::string& content)
{
	if (!full)
	{
		std::shared_ptr<ForumPostNode> newReplyPost(new ForumPostNode);
		newReplyPost->postUser = user;
		newReplyPost->postContent = content;

		//findReply(OpId, ReplyId)->replies.push_back(std::move(newReplyPost)); in case below does not work
		findReply(OpId, ReplyId)->replies.push_back(newReplyPost);
	}
} // end addReplyPost

void WebayForumData::deleteOpPost(const int& OpId)
{
	// if the deleted op post is at the end of the list, simply remove from list, else put on deletedOP vector
	if ((forumOpList[OpId] == forumOpList.end) && (forumOpList[OpId] != nullptr))
	{
		forumOpList[OpId].reset();
		forumOpList.erase(forumOpList.begin() + forumOpList.size() - 1);
	}
	else
	{
		forumOpList[OpId].reset();
		deletedOp.push_back(OpId);
	}
} // end deleteOpPost

void WebayForumData::deleteReplyPost(const int& OpId, const int ReplyId[])
{
	findReply(OpId, ReplyId).reset();
}

void WebayForumData::modifyReplyPost(const int& OpId, const int ReplyId[], const std::string& content)
{
	findReply(OpId, ReplyId)->postContent = content;
} // end modifyReplyPost

void WebayForumData::modifyOpPost(const int& OpId, const std::string& content)
{
	forumOpList[OpId]->postContent = content;
} // end modiftOpPost

void WebayForumData::searchPostTitle(const std::string& title)
{

} // end searchPostTitle

std::string WebayForumData::returnPostContent(const int& OpId, const int ReplyId[])
{
	//need to figure out whether to return singular

	return std::string();
} // end returnPostContent

void WebayForumData::reserveListSpace()
{
	// If empty, initalize space for vector, otherwise, reserve more to prevent reallocation, which would invalidate pointers
	if (forumOpList.empty)
		forumOpList.reserve(50);
	else
		forumOpList.reserve(forumOpList.capacity() + 50);
} // end reserveListSpace

// Test if there is space in memory for more objects
bool WebayForumData::full()
{
	ForumOP* temp;

	temp = new ForumOP;
	if (temp == NULL)
		return true;
	else
		return temp;

	delete temp;
} // end full

// Destroy all data when program is finished
void WebayForumData::destroyData()
{
	unsigned int i;
	for(i = 0 ; i < forumOpList.size(); i++)
	{
		deleteOpPost(i);
	}
	forumOpList.resize(0);
} // end destroyData

//Iterate to find a reply using the reply id
std::shared_ptr<ForumPostNode>  WebayForumData::findReply(const int& OpId, const int ReplyId[])
{
	std::vector<std::shared_ptr<ForumPostNode>>* replyList1 = &forumOpList[OpId]->replies;
	std::vector<std::shared_ptr<ForumPostNode>>* replyList2;
	unsigned int i;

	for (i = 0; i < sizeof(ReplyId)-1; i++)
	{
		replyList2 = &(*replyList1)[ReplyId[i]]->replies;
		replyList1 = replyList2;
	}
	std::shared_ptr<ForumPostNode> returnPtr = replyList1->at(ReplyId[sizeof(ReplyId) - 1]);
	return returnPtr;
} // end findReply