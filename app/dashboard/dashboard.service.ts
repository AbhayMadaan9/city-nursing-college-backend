import * as courseService from "../course/course.service";
import * as studentService from "../student/student.service";
export const getDashboardCards = async () => {
  const totalCourses = await courseService.getAllCourseCount();
  const totalStudents = await studentService.getAllStudentCount();
  const totalStudentsCategoryWise =
    await studentService.getStudentCountsCategoryWise();
  const currentMonthStudentFeesAmount =
    await studentService.getCurrentMonthStudentFeesCount();
  return {
    coursesCount: totalCourses,
    studentsCount: totalStudents,
    categoryWiseStudentsCount: totalStudentsCategoryWise,
    currentMonthStudentFeesAmount,
  };
};

export const getDashboardGraph = async () => {};
