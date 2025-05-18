import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/AuthContext';
import axios from 'axios';
import { useFieldArray, useForm } from 'react-hook-form';


const AddLecturePage = () => {
  const { id, chapterId } = useParams();
  const { state } = useLocation();
  const { token} = useAppContext();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    defaultValues: {
      lectures: [{ lectureOrder: '', lectureTitle: '', lectureUrl: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lectures"
  });

  const onSubmit = async (data) => {
    try {
      
      const validLectures = data.lectures.filter(lecture => 
        lecture.lectureOrder && lecture.lectureTitle && lecture.lectureUrl
      );

      if (validLectures.length === 0) {
        toast.error('Please add at least one complete lecture');
        return;
      }

      const response = await axios.post(
        `http://localhost:4000/v1/api/courses/${id}/chapters/${chapterId}/lectures`,
        { lectures: validLectures },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

   alert(response.data.message)
      reset();
      navigate(-1);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add lectures';
      
      console.error('Error adding lectures:', err.response?.data || err.message);
    }
  };

 
 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        {/* Course/Chapter Info */}
        {state && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Add Lectures to: {state.courseTitle}
            </h1>
            <h2 className="text-lg text-gray-600 mt-1">
              Chapter {state.chapterOrder}: {state.chapterTitle}
            </h2>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {fields.map((field, index) => {
              const hasErrors = 
                errors?.lectures?.[index]?.lectureOrder ||
                errors?.lectures?.[index]?.lectureTitle ||
                errors?.lectures?.[index]?.lectureUrl;

              return (
                <div 
                  key={field.id} 
                  className={`border rounded-md p-4 relative ${
                    hasErrors ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}

                  <h3 className="font-medium text-gray-700 mb-3">Lecture #{index + 1}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Lecture Order */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Number*
                      </label>
                      <input
                        type="number"
                        
                        {...register(`lectures.${index}.lectureOrder`, { 
                          required: 'Order is required',
                          min: { value: 1, message: 'Must be at least 1' },
                          valueAsNumber: true
                        })}
                        className={`w-full px-3 py-2 border rounded-md  no-spinner ${
                          errors?.lectures?.[index]?.lectureOrder ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 1, 2, 3"
                        min="1"
                      />
                      {errors?.lectures?.[index]?.lectureOrder && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lectures[index].lectureOrder.message}
                        </p>
                      )}
                    </div>

                    {/* Lecture Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lecture Title*
                      </label>
                      <input
                        type="text"
                        {...register(`lectures.${index}.lectureTitle`, { 
                          required: 'Title is required',
                          minLength: { value: 3, message: 'Minimum 3 characters' }
                        })}
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors?.lectures?.[index]?.lectureTitle ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter lecture title"
                      />
                      {errors?.lectures?.[index]?.lectureTitle && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lectures[index].lectureTitle.message}
                        </p>
                      )}
                    </div>

                    {/* Video URL */}
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Video URL*
                      </label>
                      <input
                        type="url"
                        {...register(`lectures.${index}.lectureUrl`, { 
                          required: 'URL is required',
                          pattern: {
                            value: /^(https?:\/\/).+/,
                            message: 'Must start with http:// or https://'
                          }
                        })}
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors?.lectures?.[index]?.lectureUrl ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="https://example.com/video"
                      />
                      {errors?.lectures?.[index]?.lectureUrl && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lectures[index].lectureUrl.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => append({ 
                lectureOrder: '', 
                lectureTitle: '', 
                lectureUrl: '' 
              })}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Another Lecture
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 text-white rounded-md ${
                isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save All Lectures'}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLecturePage;