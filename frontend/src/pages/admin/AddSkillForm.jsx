import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import request from '../../utils/request';

const AddSkillForm = ({ onSkillAdded }) => {
  const dispatch = useDispatch();
  const [skillData, setSkillData] = useState({
    name: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request.post('/api/skills', skillData);
      toast.success('Skill added successfully');
      setSkillData({ name: '', category: '' });
      if (onSkillAdded) {
        onSkillAdded(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding skill');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Skill Name
        </label>
        <input
          type="text"
          value={skillData.name}
          onChange={(e) => setSkillData({ ...skillData, name: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <input
          type="text"
          value={skillData.category}
          onChange={(e) => setSkillData({ ...skillData, category: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Skill
      </button>
    </form>
  );
};

export default AddSkillForm;