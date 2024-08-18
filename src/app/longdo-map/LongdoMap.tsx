"use client";
import PropTypes from 'prop-types';
import React, { Component } from 'react';

declare global {
  interface Window {
    longdo: any;
    handleButtonClick: (name: string) => void;
    handleMapClick: (latitude: number, longitude: number) => void;
    showModal: () => void;
  }
}

export let longdo: any;
export let map: any;

interface State {
  currentPosition: {
    latitude: number;
    longitude: number;
  } | null;
  packageDetails: any[] | null;
  selectedName: string | null;
  isModalVisible: boolean;
  isSidebarVisible: boolean;
}

interface Props {
  id: string;
  mapKey: string;
  callback?: () => void;
}

export class LongdoMap extends Component<Props, State> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    mapKey: PropTypes.string.isRequired,
    callback: PropTypes.func,
  };

  constructor(props: Props) {
    super(props);
    this.mapCallback = this.mapCallback.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.state = {
      currentPosition: null,
      packageDetails: null,
      selectedName: null,
      isModalVisible: false,
      isSidebarVisible: true,
    };

    // Assign handleButtonClick and handleMapClick to window
    window.handleButtonClick = this.handleButtonClick;
    window.handleMapClick = this.handleMapClick;
    window.showModal = this.showModal.bind(this);
  }

  handleButtonClick(name: string) {
    this.setState({ selectedName: name, isModalVisible: true });
  }

  hideModal() {
    this.setState({ isModalVisible: false });
  }

  handleMapClick(latitude: number, longitude: number) {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  toggleSidebar() {
    this.setState(prevState => ({ isSidebarVisible: !prevState.isSidebarVisible }));
  }

  generateNumberedIcon(number: number) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(number.toString(), 16, 16);
    }

    return canvas.toDataURL();
  }

  async mapCallback() {
    longdo = window.longdo;
    if (longdo && longdo.Map) {
      map = new longdo.Map({
        placeholder: document.getElementById(this.props.id),
        language: 'th',
        center: { lon: 99.5081412224188, lat: 16.474460094315706 }, // Set initial center
        zoom: 12 // Optional: Set the zoom level
      });

      // Set placeholder for results
      map.Route.placeholder(document.getElementById('result'));

      // Check if packageDetails are loaded
      const { packageDetails } = this.state;
      if (packageDetails) {
        packageDetails.forEach((item, index) => {
          const { userv_letlong, userv_name } = item;
          if (userv_letlong) {
            const [lat, lon] = userv_letlong.split(',').map(parseFloat);
            const markerIcon = this.generateNumberedIcon(index + 1);
            map.Route.add(new longdo.Marker({ lon, lat }, {
              icon: {
                url: markerIcon,
                offset: { x: 16, y: 16 },
              },
              title: userv_name,
              detail: `
                <div>
                  <p>${userv_letlong}</p>
                  <button onclick="window.handleMapClick(${lat}, ${lon})" class="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">
                    Open in Google Maps
                  </button>
                  <button onclick="window.showModal()" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Show Alert
                  </button>
                </div>
              `,
            }));
          }
        });
      }

      // Search for routes
      map.Route.search();

      // Call callback if provided
      if (this.props.callback) this.props.callback();
    } else {
      console.error('Longdo Map script not loaded correctly.');
    }
  }

  async componentDidMount() {
    const existingScript = document.getElementById('longdoMapScript');
    const { mapKey } = this.props;

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://api.longdo.com/map/?key=${mapKey}`;
      script.id = 'longdoMapScript';
      document.body.appendChild(script);

      script.onload = () => {
        this.mapCallback();
      };
      script.onerror = () => {
        console.error('Failed to load Longdo Map script.');
      };
    } else {
      this.mapCallback();
    }

    // Get current user position
    this.getCurrentPosition();

    // Fetch package details
    await this.fetchPackageDetails();
  }

  async fetchPackageDetails() {
    try {
      const response = await fetch(process.env.NEXT_MAP || '');
      if (!response.ok) {
        throw new Error("Failed to fetch package details");
      }
      const data = await response.json();
      console.log("Package details:", data.data.items);
      const formattedData = data.data.items.map((item: { userp_date: string | number | Date; }) => ({
        ...item,
        userp_date: new Date(item.userp_date).toLocaleDateString(),
      }));
      this.setState({ packageDetails: formattedData });
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            currentPosition: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        },
        error => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  render() {
    const { isModalVisible, selectedName, isSidebarVisible } = this.state;
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <div id={this.props.id} style={{ width: '100%', height: '100vh' }}></div>
        <button onClick={this.toggleSidebar} style={{
          position: 'absolute',
          top: '10px',
          right: isSidebarVisible ? '320px' : '10px',
          zIndex: 3,
        }}>
          {isSidebarVisible ? 'Hide' : 'Show'} Sidebar
        </button>
        <div id="result" >
          {/* Sidebar content or map results */}
        </div>
        {/* Modal content or alerts */}
      </div>
    );
  }
}

LongdoMap.propTypes = {
  id: PropTypes.string.isRequired,
  mapKey: PropTypes.string.isRequired,
  callback: PropTypes.func,
};
