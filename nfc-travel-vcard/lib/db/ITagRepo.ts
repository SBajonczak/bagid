export interface ITagRepo {
  getTravelDataByTagId(tagId: string): Promise<unknown>;
  updateTravelDataByTagId(tagId: string, updateData: Record<string, unknown>): Promise<boolean>;
  registerTagOwner(tagId: string, userId: string, userEmail: string): Promise<boolean>;
  verifyTagOwner(tagId: string, userId: string): Promise<boolean>;
  tagExists(tagId: string): Promise<boolean>;
  tagRegistered(tagId: string): Promise<boolean>;
  getUserTags(userId: string): Promise<unknown[]>;
}
