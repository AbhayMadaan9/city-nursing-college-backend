import { type ICourse } from "./course.dto";
import CourseSchema from "./course.schema";

export const createCourse = async (data: ICourse) => {
  const result = await CourseSchema.create({ ...data, active: true });
  return result;
};

export const updateCourse = async (id: string, data: Partial<ICourse>) => {
  const result = await CourseSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editCourse = async (id: string, data: Partial<ICourse>) => {
  const result = await CourseSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteCourse = async (id: string) => {
  const result = await CourseSchema.deleteOne({ _id: id });
  return result;
};

export const getCourseById = async (id: string) => {
  const result = await CourseSchema.findById(id).lean();
  return result;
};

export const getAllCourse = async (options: Record<string, any>) => {
  const result = await CourseSchema.paginate({ isDeleted: false }, options);
  return result;
};

export const getCourseByName = async (name: string) => {
  return await CourseSchema.find({ name }).lean();
};

export const getAllCourseCount = async () => {
  const result = await CourseSchema.count({ isDeleted: false });
  return result;
};
