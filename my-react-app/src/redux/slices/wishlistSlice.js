import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistAPI } from '../../services/api';
import toast from 'react-hot-toast';

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.getWishlist();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.addToWishlist(productId);
      toast.success('Added to wishlist!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to wishlist';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.removeFromWishlist(productId);
      toast.success('Removed from wishlist');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove from wishlist';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.clearWishlist();
      toast.success('Wishlist cleared');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear wishlist';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const checkInWishlist = createAsyncThunk(
  'wishlist/checkInWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.checkInWishlist(productId);
      return { productId, inWishlist: response.data.inWishlist };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    wishlistStatus: {}, // Track which products are in wishlist
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.products || [];
        
        // Update wishlist status
        state.wishlistStatus = {};
        state.items.forEach(item => {
          state.wishlistStatus[item.product._id] = true;
        });
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add to Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload.wishlist.products || [];
        
        // Update wishlist status
        state.wishlistStatus = {};
        state.items.forEach(item => {
          state.wishlistStatus[item.product._id] = true;
        });
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload.wishlist.products || [];
        
        // Update wishlist status
        state.wishlistStatus = {};
        state.items.forEach(item => {
          state.wishlistStatus[item.product._id] = true;
        });
      })
      // Clear Wishlist
      .addCase(clearWishlist.fulfilled, (state) => {
        state.items = [];
        state.wishlistStatus = {};
      })
      // Check in Wishlist
      .addCase(checkInWishlist.fulfilled, (state, action) => {
        const { productId, inWishlist } = action.payload;
        state.wishlistStatus[productId] = inWishlist;
      });
  },
});

export const { clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;