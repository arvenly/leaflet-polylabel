/*global LeafletLabel */

L.Path.include({
	bindLabel: function (content, options) {
		if (!this.label || this.label.options !== options) {
			this.label = new LeafletLabel(options, this);
		}

		this.label.setContent(content);

		/* if (!this._showLabelAdded) {
			this
				.on('mouseover', this._showLabel, this)
				.on('mousemove', this._moveLabel, this)
				.on('mouseout remove', this._hideLabel, this);

			if (L.Browser.touch) {
				this.on('click', this._showLabel, this);
			}
			this._showLabelAdded = true;
		} */
		/* if (this._map) {
			this._map.on("zoomend", this._mapZoomEnd, this);
		} */
		this._showLabel({ latlng: options.latlng });
		return this;
	},

	unbindLabel: function () {
		if (this.label) {
			this._hideLabel();
			this.label = null;
			this._showLabelAdded = false;
			this
				.off('mouseover', this._showLabel, this)
				.off('mousemove', this._moveLabel, this)
				.off('mouseout remove', this._hideLabel, this);
			/* if (this._map) {
				this._map.on("zoomend", this._mapZoomEnd, this);
			} */
				
		}
		return this;
	},

	updateLabelContent: function (content) {
		if (this.label) {
			this.label.setContent(content);
		}
	},

	_mapZoomEnd: function () {
		if (this.label) {
			this.label._updatePosition();
		}
	},

	_showLabel: function (e) {
		if (e && e.latlng) {
			this.label.setLatLng(e.latlng);
		}
		if (this._map) {
			this._map.showLabel(this.label);
		}
	},

	_moveLabel: function (e) {
		this.label.setLatLng(e.latlng);
	},

	_hideLabel: function () {
		this.label.close();
	}
});
